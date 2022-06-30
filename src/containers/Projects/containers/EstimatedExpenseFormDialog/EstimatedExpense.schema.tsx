import * as Yup from 'yup';
import intl from 'react-intl-universal';
import { DATATYPES_LENGTH } from 'common/dataTypes';

const Schema = Yup.object().shape({
  estimatedExpense: Yup.number().label(
    intl.get('estimated_expense.schema.label.estimated_expense'),
  ),
  quantity: Yup.number().label(
    intl.get('estimated_expense.schema.label.quantity'),
  ),
  unitPrice: Yup.number().label(
    intl.get('estimated_expense.schema.label.unit_price'),
  ),
  total: Yup.number(),
  charge: Yup.string(),
});

export const CreateEstimatedExpenseFormSchema = Schema;