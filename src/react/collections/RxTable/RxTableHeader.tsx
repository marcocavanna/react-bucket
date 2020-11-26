import * as React from 'react';
import clsx from 'clsx';

import { Checkbox, CheckboxProps } from '../../elements/Checkbox';
import { Input, InputProps } from '../../elements/Input';
import { SelectMultiProps, SelectProps } from '../../elements/Select';
import Select from '../../elements/Select/Select';
import SelectMulti from '../../elements/Select/SelectMulti';
import { AnyObject } from '../../generic';

import { useRxTable } from './RxTable.context';
import { RxTableFactory } from './RxTable.factory';
import { RxTableDataFilter } from './RxTable.types';
import { RxTableHeaderTitleColumn } from './RxTableColumns';


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
      <SelectMulti
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
    filters,
    setFilter
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
          <Components.FilterCell
            key={column.key}
            className={classes}
            column={column}
          >
            <RxTableFilterElement
              columnKey={column.key}
              filter={column.filter}
              setFilter={setFilter}
              filters={filters}
            />
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
    sorting
  } = useRxTable();

  return (
    <Components.HeaderRow>
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
