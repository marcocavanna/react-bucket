import arraySort from 'array-sort';
import * as React from 'react';

import { AnyObject } from '../../generic';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';

import areEqualStringArray from './lib/areEqualStringArray';

import { RxTableColumnProps } from './RxTable.types';


/* --------
 * Table Factory Configuration
 * -------- */
export interface UseRxTableFactoryConfig<Data, ColumnProps extends {} = {}> {
  /** Table Columns definition */
  columns: RxTableColumnProps<Data, ColumnProps>[];

  /** Table Data */
  data: Data[] | ((timestamp: number) => (Data[] | Promise<Data[]>));

  /** Set default data to show while factory is loading */
  defaultData?: Data[];

  /** Set the default loading state */
  defaultLoading?: boolean;

  /** Set initial reverse sorting */
  defaultReverseSorting?: boolean;

  /** Set initial sort */
  defaultSort?: string[];

  /**
   * Set the filter logic. With and type, all filter must return
   * true to show item, with or at least one must be valid
   */
  filterLogic?: 'and' | 'or';

  /** On Row Click Handler */
  onRowClick?: (row: Data, index: number, array: Data[]) => void;

  /** Callback handler fired when sort is changing */
  onSortChange?: (sorting: string[], reverse: boolean) => void;

  /** Dependencies passed to data load hook. Set this to manually control data reload */
  reloadDependency?: any;

  /** Disable Loader on data reload */
  reloadSilently?: boolean;

  /** Manual control reverse sorting */
  reverseSorting?: boolean;

  /** Manual control sorting */
  sort?: string[];
}


/* --------
 * Table Factory Tools
 * -------- */
export interface RxTableFactory<Data> {
  /** Data */
  data: Data[];

  /** Data load error */
  error: any;

  /** Current Filters */
  filters: Record<string, any>;

  /** Row Click Handler */
  handleRowClick: (index: number) => void;

  /** Return if Table could show filter row */
  hasFilterRow: boolean;

  /** Return if Table could show header row */
  hasHeaderRow: boolean;

  /** Data is Currently Loading */
  isLoading: boolean;

  /** Check if row click is enabled */
  isRowClickEnabled: boolean;

  /** Checker for reversed sorting */
  isSortReversed: boolean;

  /** Change column filter */
  setFilter: (column: string, value: any) => void;

  /** Change data sorting */
  setSorting: (fields: string[], reverse: boolean) => void;

  /** Current Sorting */
  sorting: string[];

  /** Filtered and Sorted Data */
  tableData: Data[];
}


/* --------
 * RxTable Factory Internal Data State
 * -------- */
interface RxTableFactoryState<Data> {
  /** Current Data */
  data: Data[];

  /** Data load error */
  error: any;

  /** Loading State */
  loading: boolean;

  /** The last data load timestamp */
  lastReloadTimeStamp: number;
}


/* --------
 * Hook Definition
 * -------- */
export function useRxTableFactory<Data extends AnyObject = any>(
  config: UseRxTableFactoryConfig<Data>
): RxTableFactory<Data> {


  // ----
  // Code Destructuring
  // ----
  const {
    columns,
    data,
    defaultData,
    defaultLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSort          : userDefinedDefaultSort,
    filterLogic,
    onRowClick,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    sort                 : userDefinedSort
  } = config;


  // ----
  // Checker Builder
  // ----
  const hasFilterRow = React.useMemo<boolean>(
    () => columns.some((column) => !!column.filter),
    [ columns ]
  );

  const hasHeaderRow = React.useMemo<boolean>(
    () => columns.some((column) => !!column.header),
    [ columns ]
  );


  // ----
  // Data Management and Load
  // ----

  /** Build the data state */
  const [ dataState, setDataState ] = React.useState<RxTableFactoryState<Data>>({
    data               : Array.isArray(data) ? data : (defaultData ?? []),
    error              : null,
    loading            : defaultLoading ?? typeof data === 'function',
    lastReloadTimeStamp: 0
  });

  /** Build the load data function */
  const loadData = React.useCallback(
    async () => {

      /**
       * If data is a plain a plain
       * array object then there is no
       * need to wait for data load
       */
      if (Array.isArray(data)) {
        setDataState({
          data,
          loading            : false,
          error              : null,
          lastReloadTimeStamp: Date.now()
        });
        return;
      }

      /**
       * If data loading is a function then
       * must set the loading state and wait
       * for data load.
       * Data load is typical async than must
       * set the loading state if the reload
       * is not silent. A silent reload will
       * reload table data without changing loading state
       */
      if (!dataState.loading && !reloadSilently) {
        setDataState((curr) => ({
          ...curr,
          loading: true
        }));
      }

      /** Try to load data */
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
      reloadSilently
    ]
  );

  /** Build the effect used to load/reload data */
  React.useEffect(
    () => {
      loadData();
    },
    [ loadData, reloadDependency ]
  );


  // ----
  // Filtering Data
  // ----
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


  // ----
  // Sorting Controller
  // ----
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


  // ----
  // Internal Handlers
  // ----
  const handleRowClick = React.useCallback(
    (index: number) => {
      if (onRowClick) {
        onRowClick(sortedData[index], index, sortedData);
      }
    },
    [ onRowClick, sortedData ]
  );


  return {
    handleRowClick,
    hasFilterRow,
    hasHeaderRow,
    error            : dataState.error,
    filters,
    isLoading        : dataState.loading,
    isRowClickEnabled: typeof onRowClick === 'function',
    data             : dataState.data,
    setFilter        : handleFilterChange,
    setSorting       : handleChangeSorting,
    tableData        : sortedData,
    isSortReversed,
    sorting
  };
}
