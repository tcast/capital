import React, {useCallback} from 'react';
import {
  Button,
  Intent,
} from '@blueprintjs/core';
import Icon from 'components/Icon';
import withDialog from 'containers/Dialogs/withDialog';
import {compose} from 'utils';

function UsersActions({
  openDialog,
  closeDialog,
}) {
  const onClickNewUser = useCallback(() => {
    openDialog('user-form');
  }, [openDialog]);

  return (
    <div claass="preferences-actions">
      <Button
        icon={<Icon icon='plus' iconSize={12} />}
        onClick={onClickNewUser}
        intent={Intent.PRIMARY}>
        Invite User
      </Button>

      <Button
        icon={<Icon icon='plus' iconSize={12} />}
        onClick={onClickNewUser}>
        New Role
      </Button>
    </div>
  );
}

export default compose(
  withDialog,
)(UsersActions);