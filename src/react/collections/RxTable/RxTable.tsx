import { PropsWithAs } from '@appbuckets/react-ui-core';
import * as React from 'react';
import clsx from 'clsx';
import arraySort from 'array-sort';

import { AnyObject } from '../../generic';

import { useElementType } from '../../lib';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';

import areEqualStringArray from './lib/areEqualStringArray';
import { RxTableContext, RxTableProvider } from './RxTable.context';

import { RxTableColumnProps, RxTableComponents, RxTableProps } from './RxTable.types';

import {
  RxTableBodyCell,
  RxTableBodyRow,
  RxTableError,
  RxTableFilterCell,
  RxTableHeaderCell,
  RxTableLoader,
  RxTableNoContent
} from './RxTableDefaultComponents';

import { Table } from '../Table';

import RxTableBody from './RxTableBody';
import RxTableHeader from './RxTableHeader';


/* --------
 * Component Declare
 * -------- */
type RxTableComponent<Data> = React.FunctionComponent<RxTableProps<Data>>;


/* --------
 * Component Internal State
 * -------- */
type RxTableState<Data> = {
  data: Data[];
  error: any;
  loading: boolean;
  lastReloadTimeStamp: number;
};


/* --------
 * Component Render
 * -------- */
const RxTable = <Data extends AnyObject>(
  props: React.PropsWithChildren<RxTableProps<Data>>
): React.FunctionComponentElement<RxTableProps<Data>> => {

  const {
    as,
    className,
    columns,
    Components           : userDefinedComponents,
    data,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSort          : userDefinedDefaultSort,
    disableHeader,
    filterLogic,
    initiallyLoading,
    isAsyncLoading,
    onRowClick,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    rowKey,
    sort                 : userDefinedSort,
    style,
    ...rest
  } = props;

  /** Get right element type */
  const ElementType = useElementType(RxTable, props as unknown as PropsWithAs<RxTableProps<AnyObject>>);

  /** Build Checker */
  const hasFilterRow = React.useMemo<boolean>(
    () => columns.some((column) => !!column.filter),
    [ columns ]
  );

  const hasHeaderRow = React.useMemo<boolean>(
    () => columns.some((column) => !!column.header),
    [ columns ]
  );


  /** Build the element class list */
  const classes = clsx(
    'rx-table',
    {
      filterable: hasFilterRow
    },
    className
  );


  /* --------
   * Data Load and State
   * -------- */
  const [ dataState, setDataState ] = React.useState<RxTableState<Data>>({
    data               : Array.isArray(data) ? data : [],
    error              : null,
    loading            : !!(initiallyLoading && typeof data === 'function'),
    lastReloadTimeStamp: 0
  });

  const reloadData = React.useCallback(
    async () => {
      /** Set plain array */
      if (Array.isArray(data)) {
        setDataState({
          data,
          loading            : false,
          error              : null,
          lastReloadTimeStamp: Date.now()
        });

        return;
      }

      /** Else, invoke function */
      if (isAsyncLoading && !dataState.loading && !reloadSilently) {
        setDataState((curr) => ({
          ...curr,
          loading: true
        }));
      }

      try {
        /** Await the function result */
        const result = await data(Date.now());

        setDataState({
          data               : result,
          loading            : false,
          error              : null,
          lastReloadTimeStamp: Date.now()
        });
      }
      catch (error) {
        setDataState({
          data               : [],
          loading            : false,
          error,
          lastReloadTimeStamp: Date.now()
        });
      }
    },
    [
      data,
      dataState.loading,
      isAsyncLoading,
      reloadSilently
    ]
  );

  React.useEffect(
    () => {
      reloadData();
    },
    [
      reloadData,
      reloadDependency
    ]
  );


  /* --------
   * Define RxTable Components
   * -------- */
  const Components: RxTableComponents<Data> = {
    Body         : Table.Body,
    BodyCell     : RxTableBodyCell,
    BodyRow      : RxTableBodyRow,
    BodyWrapper  : React.Fragment,
    Error        : RxTableError,
    ErrorRow     : Table.Row,
    ErrorCell    : Table.Cell,
    FilterCell   : RxTableFilterCell,
    FilterRow    : Table.Row,
    Header       : Table.Header,
    HeaderCell   : RxTableHeaderCell,
    HeaderRow    : Table.Row,
    HeaderWrapper: React.Fragment,
    Loader       : RxTableLoader,
    LoaderRow    : Table.Row,
    LoaderCell   : Table.Cell,
    NoContent    : RxTableNoContent,
    NoContentCell: Table.Cell,
    NoContentRow : Table.Row,
    ...userDefinedComponents
  };


  /* --------
   * Row Key Getter
   * -------- */
  const getRowKey = React.useCallback(
    (row: Data, index: number) => {
      if (typeof rowKey === 'function') {
        return rowKey(row, index, dataState.data);
      }

      return row[rowKey];
    },
    [ rowKey, dataState.data ]
  );


  /* --------
   * Control Data Filtering
   * -------- */
  const [ filters, setFilteringValues ] = React.useState<Record<string, any>>(
    columns.reduce<Record<string, any>>(
      (acc, column) => {
        if (column.filter) {
          acc[column.key] = column.filter.initialValue;
        }

        return acc;
      },
      {}
    )
  );

  const handleFilterChange = React.useCallback(
    (columnKey: string, value: any) => {
      setFilteringValues((curr) => ({
        ...curr,
        [columnKey]: value
      }));
    },
    [ setFilteringValues ]
  );

  const filteredData = React.useMemo<Data[]>(
    () => {
      /** If no filter, return entire data */
      if (!hasFilterRow) {
        return dataState.data;
      }

      /** Get only filter columns */
      const filterColumns = columns.filter((column) => {
        if (!column.filter) {
          return false;
        }

        if (column.filter.type === 'input') {
          return typeof filters[column.key] === 'string' && !!filters[column.key].length;
        }

        if (column.filter.type === 'checkbox') {
          return typeof filters[column.key] === 'boolean' && !!filters[column.key];
        }

        return false;
      });

      /** If no columns are able to filter data, return entire data set */
      if (!filterColumns.length) {
        return dataState.data;
      }

      /** Filter data using columns */
      return dataState.data.filter((row, index, array) => {
        return filterColumns.reduce(
          (show: boolean, next: RxTableColumnProps<Data>) => (
            filterLogic === 'and'
              ? show && next.filter!.show(filters[next.key] as (string & number), row, index, array)
              : show || next.filter!.show(filters[next.key] as (string & number), row, index, array)
          ),
          filterLogic === 'and'
        );
      });
    },
    [
      columns,
      dataState.data,
      filterLogic,
      filters,
      hasFilterRow
    ]
  );


  /* --------
   * Control Data Sorting
   * -------- */
  const [ sorting, trySetSorting ] = useAutoControlledValue([], {
    defaultProp: userDefinedDefaultSort,
    prop       : userDefinedSort
  });

  const [ isSortReversed, trySetReverseSorting ] = useAutoControlledValue(false, {
    defaultProp: userDefinedDefaultReverseSorting,
    prop       : userDefinedReverseSorting
  });

  const handleChangeSorting = React.useCallback(
    (newSorting: string[], reverse: boolean) => {
      /** Check if sorting is changed */
      const isSortChanged = !areEqualStringArray(sorting, newSorting);
      const isReversingChanged = reverse !== isSortReversed;

      /** If no change, return */
      if (!isSortChanged && !isReversingChanged) {
        return;
      }

      /** Call user defined handler */
      if (onSortChange) {
        onSortChange(newSorting, reverse);
      }

      /** Try to set new Sorting */
      if (isSortChanged) {
        trySetSorting(newSorting);
      }

      if (reverse !== isSortReversed) {
        trySetReverseSorting(reverse);
      }
    },
    [ onSortChange, isSortReversed, sorting, trySetReverseSorting, trySetSorting ]
  );

  const sortedData = React.useMemo<Data[]>(
    () => {
      if (sorting.length) {
        return arraySort(filteredData, sorting, { reverse: isSortReversed });
      }

      return filteredData;
    },
    [ filteredData, isSortReversed, sorting ]
  );


  /* --------
   * Side Handlers
   * -------- */
  const handleRowClick = React.useCallback(
    (index: number) => {
      if (onRowClick) {
        onRowClick(sortedData[index], index, sortedData);
      }
    },
    [ onRowClick, sortedData ]
  );


  /* --------
   * Context Building
   * -------- */
  const rxTableContext: RxTableContext<Data> = {
    allDataLength     : dataState.data.length,
    changeFilters     : handleFilterChange,
    Components,
    columns,
    data              : sortedData,
    error             : dataState.error,
    filteredDataLength: sortedData.length,
    filters,
    getRowKey,
    hasFilterRow,
    hasHeaderRow,
    isLoading         : dataState.loading,
    isRowClickEnabled : typeof onRowClick === 'function',
    isSortReversed,
    rowClick          : handleRowClick,
    sort              : handleChangeSorting,
    sorting
  };


  /* --------
   * Component Render
   * -------- */
  return (
    <RxTableProvider value={rxTableContext}>
      <ElementType className={classes} {...rest}>
        <RxTableHeader />
        <RxTableBody />
      </ElementType>
    </RxTableProvider>
  );
};

(RxTable as RxTableComponent<any>).displayName = 'RxTable';

(RxTable as RxTableComponent<any>).defaultProps = {
  as              : Table,
  filterLogic     : 'and',
  initiallyLoading: true,
  isAsyncLoading  : true,
  reloadSilently  : true
};

export default RxTable;
