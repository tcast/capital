import React from 'react';
import intl from 'react-intl-universal';
import { Tooltip, Button, Intent, Position } from '@blueprintjs/core';

import {
  MoneyFieldCell,
  FormatDateCell,
  Icon,
  AppToaster,
  T,
} from 'components';
import { InputGroupCell, ItemsListCell } from 'components/DataTableCells';

// Index table cell.
export function IndexTableCell({ row: { index } }) {
  return <span>{index + 1}</span>;
}

/**
 * Actions cell renderer component.
 */
export function ActionsCellRenderer({
  row: { index },
  column: { id },
  cell: { value },
  data,
  payload: { removeRow },
}) {
  const onRemoveRole = () => {
    removeRow(index);
  };

  return (
    <Tooltip content={<T id={'remove_the_line'} />} position={Position.LEFT}>
      <Button
        icon={<Icon icon={'times-circle'} iconSize={14} />}
        iconSize={14}
        className="m12"
        intent={Intent.DANGER}
        onClick={onRemoveRole}
      />
    </Tooltip>
  );
}

/**
 * Retrieves warehouse transfer table columns.
 * @returns
 */
export const useWarehouseTransferTableColumns = () => {
  return React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'index',
        Cell: IndexTableCell,
        width: 40,
        disableResizing: true,
        disableSortBy: true,
        className: 'index',
      },
      {
        id: 'item_id',
        Header: intl.get('warehouse_transfer.column.item_name'),
        accessor: 'item_id',
        Cell: ItemsListCell,
        disableSortBy: true,
        width: 130,
        className: 'item',
        fieldProps: { allowCreate: true },
      },
      {
        Header: intl.get('description'),
        accessor: 'description',
        Cell: InputGroupCell,
        disableSortBy: true,
        className: 'description',
        width: 120,
      },
      {
        id: 'source_warehouse',
        Header: 'Source Warehouse',
        accessor: 'source_warehouse',
        disableSortBy: true,
        align: 'right',
        width: 120,
      },
      {
        id: 'destination_warehouse',
        Header: 'Destination Warehouse',
        accessor: 'destination_warehouse',
        disableSortBy: true,
        align: 'right',
        width: 120,
      },
      {
        Header: intl.get('warehouse_transfer.column.transfer_quantity'),
        accessor: 'quantity',
        Cell: MoneyFieldCell,
        disableSortBy: true,
        align: 'right',
        width: 100,
      },
      {
        Header: '',
        accessor: 'action',
        Cell: ActionsCellRenderer,
        className: 'actions',
        disableSortBy: true,
        disableResizing: true,
        width: 45,
      },
    ],
    [],
  );
};