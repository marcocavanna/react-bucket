import * as React from 'react';
import clsx from 'clsx';

import areEqualStringArray from './lib/areEqualStringArray';

import { Checkbox, CheckboxProps } from '../../elements/Checkbox';
import { Input, InputProps } from '../../elements/Input';
import { SelectProps } from '../../elements/Select';

import { useRxTable } from './RxTable.context';
import { RxTableDataFilter } from './RxTable.types';


/* --------
 * Table Filter Row Render
 * -------- */
export interface RxTableFilterElementProps {
  /** The Column Key */
  columnKey: string;

  /** Filter type */
  filter?: RxTableDataFilter<unknown>;
}

const RxTableFilterElement: React.FunctionComponent<RxTableFilterElementProps> = (
  props
) => {

  const {
    changeFilters,
    filters
  } = useRxTable();

  const {
    columnKey,
    filter
  } = props;

  /** Build Handlers */
  const filterValue = filters[columnKey];
  const handleFilterChange = React.useCallback(
    (e: any, filterProps?: InputProps | CheckboxProps | SelectProps) => {
      if (filter) {
        if (filter.type === 'input') {
          changeFilters(columnKey, filterProps!.value);
        }
        else if (filter.type === 'checkbox') {
          changeFilters(columnKey, !filterValue);
        }
      }
    },
    [
      changeFilters,
      filter,
      filterValue,
      columnKey
    ]
  );

  /** If no type, return no filter */
  if (!filter) {
    return null;
  }

  /** Return the right filter */
  if (filter.type === 'input') {
    return (
      <Input
        icon={'filter'}
        {...filter.props}
        value={filters[columnKey]}
        onChange={handleFilterChange}
      />
    );
  }

  if (filter.type === 'checkbox') {
    return (
      <Checkbox
        {...filter.props}
        checked={!!filters[columnKey]}
        onChange={handleFilterChange}
      />
    );
  }

  return null;
};

const RxTableFilterRow: React.FunctionComponent = () => {

  const {
    columns,
    Components
  } = useRxTable();

  return (
    <Components.FilterRow>
      {columns.map((column) => {
        /** Build className */
        const classes = clsx(
          'filter',
          column.textAlign && `has-text-${column.textAlign}`
        );

        /** Return the Filter */
        return (
          <Components.FilterCell key={column.key} className={classes}>
            <RxTableFilterElement columnKey={column.key} filter={column.filter} />
          </Components.FilterCell>
        );
      })}
    </Components.FilterRow>
  );

};


/* --------
 * Table Header Render
 * -------- */
const RxTableHeaderRow: React.FunctionComponent = () => {

  const {
    columns,
    Components,
    isSortReversed,
    sort,
    sorting
  } = useRxTable();

  return (
    <Components.HeaderRow>
      {columns.map((column) => {
        /** Compute Sorting Props */
        const hasSorting = Array.isArray(column.sort) && !!column.sort.length;
        const isActualSortingColumn = hasSorting && areEqualStringArray(sorting, column.sort!);

        /** Build header classes */
        const classes = clsx(
          column.textAlign && `has-text-${column.textAlign}`
        );

        /** Build the handler to change sorting */
        const handleChangeSorting = () => {
          if (!hasSorting) {
            return;
          }

          if (isActualSortingColumn) {
            sort(column.sort!, !isSortReversed);
          }
          else {
            sort(column.sort!, false);
          }
        };

        return (
          <Components.HeaderCell
            key={column.key}
            className={classes}
            content={column.header}
            hasSorting={hasSorting}
            isActualSortingColumn={isActualSortingColumn}
            isReversedSorting={isActualSortingColumn && isSortReversed}
            onClick={hasSorting ? handleChangeSorting : undefined}
          />
        );
      })}
    </Components.HeaderRow>
  );

};


/* --------
 * Component Definition
 * -------- */
const RxTableHeader: React.FunctionComponent = () => {

  const {
    Components,
    hasHeaderRow,
    hasFilterRow
  } = useRxTable();

  /** If table has no header or filter row, return an empty component */
  if (!hasFilterRow && !hasHeaderRow) {
    return null;
  }

  /** Return wrapped rows */
  return (
    <Components.HeaderWrapper>
      <Components.Header>
        {hasHeaderRow && <RxTableHeaderRow />}
        {hasFilterRow && <RxTableFilterRow />}
      </Components.Header>
    </Components.HeaderWrapper>
  );
};

RxTableHeader.displayName = 'RxTableHeader';

export default RxTableHeader;
