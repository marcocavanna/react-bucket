import * as React from 'react';
import clsx from 'clsx';
import { Checkbox } from '../../elements/Checkbox';

import { useRxTable } from './RxTable.context';

import { RxTableCellComponent, RxTableColumnProps } from './RxTable.types';


/* --------
 * Row Selects
 * -------- */
const RxTableRowSelector: React.FunctionComponent<{ row: any }> = (
  props
) => {
  const {
    row
  } = props;

  const {
    isRowSelected,
    toggleSelectRow
  } = useRxTable();

  const handleToggleRow = React.useCallback(
    () => {
      toggleSelectRow(row);
    },
    [ toggleSelectRow, row ]
  );

  return (
    <Checkbox
      checked={isRowSelected(row)}
      onClick={handleToggleRow}
    />
  );
};


/* --------
 * Single Row Cell Component
 * -------- */
interface RxTableBodyCellProps<Data> {
  className?: string;

  column: RxTableColumnProps<Data>;

  columnIndex?: number;

  Component: RxTableCellComponent<Data>;

  tableData: Data[];

  index: number;

  isSelectable?: boolean;

  SelectorComponent?: React.FunctionComponent<{ row: Data }>;

  row: Data;
}

export const RxTableBodyCell: React.FunctionComponent<RxTableBodyCellProps<unknown>> = (
  props
) => {

  const {
    className,
    Component,
    column,
    tableData,
    index,
    row,
    isSelectable,
    columnIndex,
    SelectorComponent
  } = props;

  const classes = clsx(
    column.textAlign && `has-text-${column.textAlign}`,
    column.className,
    className
  );

  if (isSelectable && columnIndex === 0) {
    return (
      <Component
        className={classes}
        column={column}
        tableData={tableData}
        index={index}
        row={row}
      >
        {SelectorComponent && <SelectorComponent row={row} />}
      </Component>
    );
  }

  return (
    <Component
      className={classes}
      column={column}
      tableData={tableData}
      index={index}
      row={row}
    />
  );

};


/* --------
 * Single Row Component
 * -------- */
const RxTableRow: React.FunctionComponent<{ index: number }> = (
  props
) => {

  /** Extract index from Props */
  const { index } = props;

  const {
    columns,
    Components,
    tableData,
    isRowClickEnabled,
    handleRowClick: superHandleRowClick,
    isSelectable
  } = useRxTable();

  /** Get Row Data */
  const row = tableData[index];

  /** Build row classes */
  const classes = clsx({
    last     : index === tableData.length - 1,
    first    : index === 0,
    clickable: isRowClickEnabled
  });


  /* --------
   * Handlers
   * -------- */
  const handleRowClick = React.useCallback(
    () => {
      superHandleRowClick(index);
    },
    [ superHandleRowClick, index ]
  );


  /* --------
   * Return the Component
   * -------- */
  return (
    <Components.BodyRow
      className={classes}
      columns={columns}
      index={index}
      onClick={isRowClickEnabled ? handleRowClick : undefined}
      row={row}
    >
      {columns.map((column, columnIndex) => (
        <RxTableBodyCell
          key={column.key}
          Component={Components.BodyCell}
          column={column}
          tableData={tableData}
          index={index}
          row={row}
          columnIndex={columnIndex}
          isSelectable={isSelectable}
          SelectorComponent={RxTableRowSelector}
        />
      ))}
    </Components.BodyRow>
  );

};


/* --------
 * Main Component Definition
 * -------- */
const RxTableBody: React.FunctionComponent = () => {

  const {
    columns,
    Components,
    error,
    filters,
    isLoading,
    tableData,
    getRowKey
  } = useRxTable();

  /** Show the Loader while requesting data */
  if (isLoading) {
    return (
      <Components.BodyWrapper>
        <Components.Body>
          <Components.LoaderRow className={'loading-row'}>
            <Components.LoaderCell colSpan={columns.length} className={'loading-cell'}>
              <Components.Loader />
            </Components.LoaderCell>
          </Components.LoaderRow>
        </Components.Body>
      </Components.BodyWrapper>
    );
  }

  /** If an error occurred, show dedicated component */
  if (error) {
    return (
      <Components.BodyWrapper>
        <Components.Body>
          <Components.ErrorRow className={'error-row'}>
            <Components.ErrorCell colSpan={columns.length} className={'error-cell'}>
              <Components.Error error={error} />
            </Components.ErrorCell>
          </Components.ErrorRow>
        </Components.Body>
      </Components.BodyWrapper>
    );
  }

  /** Render no Content */
  if (!tableData.length) {
    return (
      <Components.BodyWrapper>
        <Components.Body>
          <Components.NoContentRow className={'no-content-row'}>
            <Components.NoContentCell colSpan={columns.length} className={'no-content-cell'}>
              <Components.NoContent filters={filters} />
            </Components.NoContentCell>
          </Components.NoContentRow>
        </Components.Body>
      </Components.BodyWrapper>
    );
  }

  /** Render Data */
  return (
    <Components.BodyWrapper>
      <Components.Body>
        {tableData.map((row, index) => (
          <RxTableRow
            key={getRowKey(row, index, tableData)}
            index={index}
          />
        ))}
      </Components.Body>
    </Components.BodyWrapper>
  );
};

export { RxTableBody };
