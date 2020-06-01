import React, { useCallback } from 'react';
import { FormattedMessage as T, useIntl } from 'react-intl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  Button,
  FormGroup,
  InputGroup,
  Intent,
  Classes,
} from '@blueprintjs/core';
import { objectKeysTransform } from 'utils';
import { pick, snakeCase } from 'lodash';
import classNames from 'classnames';

import AppToaster from 'components/AppToaster';
import DialogReduxConnect from 'components/DialogReduxConnect';
import ErrorMessage from 'components/ErrorMessage';
import useAsync from 'hooks/async';
import UserFormDialogConnect from 'containers/Dialogs/UserFormDialog.connector';
import withUsersActions from 'containers/Users/withUsersActions';
import withDialog from 'containers/Dialogs/withDialog';

import { compose } from 'utils';

function UserFormDialog({
  requestFetchUser,
  requestSubmitInvite,
  name,
  payload,
  isOpen,
  closeDialog,
}) {
  const { formatMessage } = useIntl();
  const fetchHook = useAsync(async () => {
    await Promise.all([
      ...(payload.action === 'edit' ? [requestFetchUser(payload.user.id)] : []),
    ]);
  }, false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required()
      .label(formatMessage({ id: 'email' })),
  });

  const initialValues = {
    status: 1,
    ...(payload.action === 'edit' &&
      pick(
        objectKeysTransform(payload.user, snakeCase),
        Object.keys(validationSchema.fields),
      )),
  };

  const {
    errors,
    touched,
    resetForm,
    getFieldProps,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const form = { ...values };

      requestSubmitInvite(form).then((response) => {
        AppToaster.show({
          message: formatMessage({
            id: 'teammate_invited_to_organization_account',
          }),
          intent: Intent.SUCCESS,
        });
        closeDialog(name);
      });
    },
  });
  const onDialogOpening = () => {
    fetchHook.execute();
  };

  const onDialogClosed = useCallback(() => {
    resetForm();
  }, [resetForm]);

  // Handles dialog close.
  const handleClose = useCallback(() => {
    closeDialog(name);
  }, [closeDialog, name]);

  return (
    <Dialog
      name={name}
      title={
        payload.action === 'edit' ? (
          <T id={'edit_invite'} />
        ) : (
          <T id={'invite_user'} />
        )
      }
      className={classNames({
        'dialog--loading': fetchHook.pending,
        'dialog--invite-form': true,
      })}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      isLoading={fetchHook.pending}
      onClosed={onDialogClosed}
      onOpening={onDialogOpening}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <div className={Classes.DIALOG_BODY}>
          <p class="mb2">
            <T id={'your_access_to_your_team'} />
          </p>

          <FormGroup
            label={<T id={'email'} />}
            className={classNames('form-group--email', Classes.FILL)}
            intent={errors.email && touched.email && Intent.DANGER}
            helperText={<ErrorMessage name="email" {...{ errors, touched }} />}
            inline={true}
          >
            <InputGroup
              medium={true}
              intent={errors.email && touched.email && Intent.DANGER}
              {...getFieldProps('email')}
            />
          </FormGroup>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={handleClose}>
              <T id={'cancel'} />
            </Button>
            <Button
              intent={Intent.PRIMARY}
              type="submit"
              disabled={isSubmitting}
            >
              {payload.action === 'edit' ? (
                <T id={'edit'} />
              ) : (
                <T id={'invite'} />
              )}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}

export default compose(
  UserFormDialogConnect,
  withUsersActions,
  withDialog,
  DialogReduxConnect,
)(UserFormDialog);
