// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { T, TotalLines, TotalLine, TotalLineTextStyle } from '@/components';
import {
  useEstimateAdjustmentFormatted,
  useEstimateDiscountFormatted,
  useEstimateSubtotalFormatted,
  useEstimateTotalFormatted,
} from './utils';
import { AdjustmentTotalLine } from '../../Invoices/InvoiceForm/AdjustmentTotalLine';
import { DiscountTotalLine } from '../../Invoices/InvoiceForm/DiscountTotalLine';

export function EstimateFormFooterRight() {
  const subtotalFormatted = useEstimateSubtotalFormatted();
  const totalFormatted = useEstimateTotalFormatted();
  const {
    values: { currency_code },
  } = useFormikContext();
  const discountAmount = useEstimateDiscountFormatted();
  const adjustmentAmount = useEstimateAdjustmentFormatted();

  return (
    <EstimateTotalLines labelColWidth={'180px'} amountColWidth={'180px'}>
      <TotalLine
        title={<T id={'estimate_form.label.subtotal'} />}
        value={subtotalFormatted}
      />
      <DiscountTotalLine
        currencyCode={currency_code}
        discountAmount={discountAmount}
      />
      <AdjustmentTotalLine adjustmentAmount={adjustmentAmount} />
      <TotalLine
        title={<T id={'estimate_form.label.total'} />}
        value={totalFormatted}
        textStyle={TotalLineTextStyle.Bold}
      />
    </EstimateTotalLines>
  );
}

const EstimateTotalLines = styled(TotalLines)`
  width: 100%;
  color: #555555;
`;
