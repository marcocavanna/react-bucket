import * as React from 'react';
import clsx from 'clsx';

import { AnyObject } from '../../generic';

import { Checkbox, CheckboxProps } from '../../elements/Checkbox';
import { Input, InputProps } from '../../elements/Input';
import { Select, MultiSelect, SelectMultiProps, SelectProps } from '../../elements/Select';

import { useRxTable } from './RxTable.context';
import { RxTableFactory } from './RxTable.factory';
import { RxTableDataFilter } from './RxTable.types';
import { RxTableHeaderTitleColumn } from './RxTableColumns';


/* --------
 * Select All Rows
 * -------- */
const RxTableAllRowSelector: React.FunctionComponent = () => {

  const {
    selectedCount,
    selectAllRows,
    deselectAllRows,
    data
  } = useRxTable();

  const handleCheckboxChange = React.useCallback(
    () => {
      if (selectedCount >= data.length) {
        deselectAllRows();
      }
      else {
        selectAllRows();
      }
    },
    [ deselectAllRows, selectAllRows, selectedCount, data.length ]
  );

  return (
    <Checkbox
      checked={selectedCount >= data.length}
      indeterminate={selectedCount > 0 && selectedCount < data.length}
      onClick={handleCheckboxChange}
    />
  );
};


/* --------
 * Table Filter Row Render
 * -------- */
export interface RxTableFilterElementProps {
  /** The Column Key */
  columnKey: string;

  /** Filter type */
  filter?: RxTableDataFilter<unknown>;

  /** All filters */
  filters: RxTableFactory<any>['filters'];

  /** Set filter function */
  setFilter: RxTableFactory<any>['setFilter'];
}

export const RxTableFilterElement: React.FunctionComponent<RxTableFilterElementProps> = (
  props
) => {

  const {
    columnKey,
    filter,
    filters,
    setFilter
  } = props;

  /** Build Handlers */
  const filterValue = filters[columnKey];
  const handleFilterChange = React.useCallback(
    (e: any, filterProps?: InputProps | CheckboxProps) => {
      if (filter) {
        if (filter.type === 'input') {
          setFilter(columnKey, filterProps!.value);
        }
        else if (filter.type === 'checkbox') {
          setFilter(columnKey, !filterValue);
        }
      }
    },
    [
      setFilter,
      filter,
      filterValue,
      columnKey
    ]
  );

  const handleSelectFilterChange = React.useCallback(
    (nothing: null, selectProps: SelectProps<AnyObject, null>) => {
      setFilter(columnKey, selectProps.value);
    },
    [ setFilter, columnKey ]
  );

  const handleMultiSelectFilterChange = React.useCallback(
    (nothing: null, selectProps: SelectMultiProps<any[], []>) => {
      setFilter(columnKey, selectProps.value);
    },
    [ setFilter, columnKey ]
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

  if (filter.type === 'select') {
    return (
      <Select
        {...filter.props}
        isClearable={true}
        onChange={handleSelectFilterChange}
      />
    );
  }

  if (filter.type === 'multi-select') {
    return (
      <MultiSelect
        {...filter.props}
        onChange={handleMultiSelectFilterChange}
      />
    );
  }

  return null;
};

const RxTableFilterRow: React.FunctionComponent = () => {

  const {
    columns,
    Components,
    isSelectable,
    filters,
    setFilter
  } = useRxTable();

  return (
    <Components.FilterRow>
      {columns.map((column, index) => {
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
            {isSelectable && index === 0
              ? (
                <RxTableAllRowSelector />
              )
              : (
                <RxTableFilterElement
                  columnKey={column.key}
                  filter={column.filter}
                  filters={filters}
                  setFilter={setFilter}
                />
              )}
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
    setSorting,
    sorting,
    hasFilterRow,
    isSelectable
  } = useRxTable();

  return (
    <Components.HeaderRow>
      {columns.map((column, index) => (
        isSelectable && index === 0 && !hasFilterRow
          ? (
            <RxTableAllRowSelector />
          )
          : (
            <RxTableHeaderTitleColumn
              key={column.key}
              column={column}
              Component={Components.HeaderCell}
              isSortReversed={isSortReversed}
              onSortChange={setSorting}
              tableSorting={sorting}
            />
          )
      ))}
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

export { RxTableHeader };
