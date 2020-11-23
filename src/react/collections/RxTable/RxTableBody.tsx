import * as React from 'react';
import clsx from 'clsx';

import { useRxTable } from './RxTable.context';

import { RxTableCellComponent, RxTableColumnProps } from './RxTable.types';


/* --------
 * Single Row Cell Component
 * -------- */
interface RxTableBodyCellProps<Data> {
  column: RxTableColumnProps<Data>;

  Component: RxTableCellComponent<Data>;

  data: Data[];

  index: number;

  row: Data;
}

const RxTableBodyCell: React.FunctionComponent<RxTableBodyCellProps<unknown>> = (
  props
) => {

  const {
    Component,
    column,
    data,
    index,
    row
  } = props;

  const classes = clsx(
    column.textAlign && `has-text-${column.textAlign}`,
    column.className
  );

  return (
    <Component
      className={classes}
      column={column}
      data={data}
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
    data,
    isRowClickEnabled,
    rowClick
  } = useRxTable();

  /** Get Row Data */
  const row = data[index];

  /** Build row classes */
  const classes = clsx({
    last     : index === data.length - 1,
    first    : index === 0,
    clickable: isRowClickEnabled
  });


  /* --------
   * Handlers
   * -------- */
  const handleRowClick = React.useCallback(
    () => {
      rowClick(index);
    },
    [ rowClick, index ]
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
      {columns.map((column) => (
        <RxTableBodyCell
          key={column.key}
          Component={Components.BodyCell}
          column={column}
          data={data}
          index={index}
          row={row}
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
    data,
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
  if (!data.length) {
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
        {data.map((row, index) => (
          <RxTableRow
            key={getRowKey(row, index, data)}
            index={index}
          />
        ))}
      </Components.Body>
    </Components.BodyWrapper>
  );
};

export default RxTableBody;
