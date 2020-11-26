import * as React from 'react';
import clsx from 'clsx';

import { RxTableHeaderTitleColumn } from '../../collections/RxTable/RxTableColumns';
import { RxTableFilterElement } from '../../collections/RxTable/RxTableHeader';

import { useVirtualizedTable } from './VirtualizedTable.context';


/* --------
 * Table Header Render
 * -------- */
const VirtualizedTableFilterRow: React.FunctionComponent = () => {

  const {
    columns,
    Components,
    filterRowHeight,
    filters,
    setFilter
  } = useVirtualizedTable();

  return (
    <Components.FilterRow
      className={'virtualized filter row'}
      style={{ height: filterRowHeight }}
    >
      {columns.map((column) => {
        /** Build className */
        const classes = clsx(
          'filter',
          column.textAlign && `has-text-${column.textAlign}`
        );

        /** Return the Filter */
        return (
          <Components.FilterCell
            key={column.key}
            className={classes}
            column={column}
          >
            <RxTableFilterElement
              columnKey={column.key}
              filter={column.filter}
              filters={filters}
              setFilter={setFilter}
            />
          </Components.FilterCell>
        );
      })}
    </Components.FilterRow>
  );
};


const VirtualizedTableHeaderRow: React.FunctionComponent = () => {

  const {
    columns,
    Components,
    isSortReversed,
    setSorting,
    sorting,
    headerHeight
  } = useVirtualizedTable();

  return (
    <Components.HeaderRow
      className={'virtualized row'}
      style={{ height: headerHeight }}
    >
      {columns.map((column) => (
        <RxTableHeaderTitleColumn
          key={column.key}
          column={column}
          Component={Components.HeaderCell}
          isSortReversed={isSortReversed}
          onSortChange={setSorting}
          tableSorting={sorting}
        />
      ))}
    </Components.HeaderRow>
  );

};


/* --------
 * Component Definition
 * -------- */
const VirtualizedTableHeader: React.FunctionComponent = () => {

  const {
    Components,
    hasHeaderRow,
    hasFilterRow,
    headerHeight,
    filterRowHeight
  } = useVirtualizedTable();

  /** If has no row, return empty component */
  if (!hasFilterRow && !hasHeaderRow) {
    return null;
  }

  return (
    <Components.HeaderWrapper className={'virtualized table'}>
      <Components.Header className={'virtualized head'}>
        {hasHeaderRow && headerHeight > 0 && (
          <VirtualizedTableHeaderRow />
        )}
        {hasFilterRow && filterRowHeight > 0 && (
          <VirtualizedTableFilterRow />
        )}
      </Components.Header>
    </Components.HeaderWrapper>
  );
};

VirtualizedTableHeader.displayName = 'VirtualizedTableHeader';

export { VirtualizedTableHeader };
