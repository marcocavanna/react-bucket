import * as React from 'react';
import arraySort from 'array-sort';
import invariant from 'tiny-invariant';

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

  /** Set the default selected data */
  defaultSelectedData?: Data[];

  /** Set initial sort */
  defaultSort?: string[];

  /**
   * Set the filter logic. With and type, all filter must return
   * true to show item, with or at least one must be valid
   */
  filterLogic?: 'and' | 'or';

  /** A function to retrive data key */
  getRowKey?: keyof Data | ((row: Data, index: number, array: Data[]) => string | number);

  /** On Row Click Handler */
  onRowClick?: (row: Data, index: number, array: Data[]) => void;

  /** On Selected Data Change */
  onSelectedDataChange?: (selected: Data[]) => void;

  /** Callback handler fired when sort is changing */
  onSortChange?: (sorting: string[], reverse: boolean) => void;

  /** Dependencies passed to data load hook. Set this to manually control data reload */
  reloadDependency?: any;

  /** Disable Loader on data reload */
  reloadSilently?: boolean;

  /** Manual control reverse sorting */
  reverseSorting?: boolean;

  /** Set if row could be selected */
  selectable?: boolean;

  /** Manual control sorting */
  sort?: string[];
}


/* --------
 * Table Factory Tools
 * -------- */
export interface RxTableFactory<Data> {
  /** Data */
  data: Data[];

  /** Deselect all Rows */
  deselectAllRows: () => void;

  /** Deselect a Row */
  deselectRow: (...rows: Data[]) => void;

  /** Data load error */
  error: any;

  /** Current Filters */
  filters: Record<string, any>;

  /** Memoized getRowKey Function */
  getRowKey: (row: Data, index: number, array: Data[]) => React.Key;

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

  /** Check if a Row is Selected */
  isRowSelected: (row: Data) => boolean;

  /** Check if row are selectable */
  isSelectable: boolean;

  /** Checker for reversed sorting */
  isSortReversed: boolean;

  /** Select all Rows */
  selectAllRows: () => void;

  /** Selected rows count */
  selectedCount: number;

  /** Select a Row */
  selectRow: (...rows: Data[]) => void;

  /** Change column filter */
  setFilter: (column: string, value: any) => void;

  /** Change data sorting */
  setSorting: (fields: string[], reverse: boolean) => void;

  /** Current Sorting */
  sorting: string[];

  /** Filtered and Sorted Data */
  tableData: Data[];

  /** Toggle Row Selected State */
  toggleSelectRow: (row: Data) => void;
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

  /** Number of reload */
  reloadCount: number;
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
    defaultSelectedData  : userDefinedDefaultSelectedData,
    defaultSort          : userDefinedDefaultSort,
    filterLogic,
    getRowKey            : userDefinedGetRowKey,
    onRowClick,
    onSelectedDataChange,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    selectable,
    sort                 : userDefinedSort
  } = config;


  // ----
  // Memoize the RowKey extractor
  // ----
  const getRowKey = React.useCallback(
    (row: Data, index: number, array: Data[]): React.Key => {
      if (typeof userDefinedGetRowKey === 'function') {
        return userDefinedGetRowKey(row, index, array);
      }

      if (typeof userDefinedGetRowKey === 'string') {
        return row[userDefinedGetRowKey];
      }

      return '';
    },
    [ userDefinedGetRowKey ]
  );


  // ----
  // Invariant Check selectable and getRowKey
  // ----
  if (process.env.NODE_ENV === 'development' && selectable) {
    invariant(
      typeof getRowKey === 'function',
      'To correctly use selectable table the getRowKey'
      + 'function must be declared'
    );
  }


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
    lastReloadTimeStamp: 0,
    reloadCount        : 0
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
        setDataState((curr) => ({
          data,
          loading            : false,
          error              : null,
          lastReloadTimeStamp: Date.now(),
          reloadCount        : curr.reloadCount + 1
        }));
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

        setDataState((curr) => ({
          data               : result,
          loading            : false,
          error              : null,
          lastReloadTimeStamp: Date.now(),
          reloadCount        : curr.reloadCount + 1
        }));
      }
      catch (error) {
        setDataState((curr) => ({
          data               : [],
          loading            : false,
          error,
          lastReloadTimeStamp: Date.now(),
          reloadCount        : curr.reloadCount + 1
        }));
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
  // Data Key Building
  // ----
  const dataKeys: Map<Data, React.Key> = React.useMemo(
    () => {
      /** Build a new Map to save all data keys */
      const keys = new Map<Data, React.Key>();

      /** If no function exists to get row key, exit */
      if (typeof getRowKey !== 'function' && !!userDefinedGetRowKey) {
        return keys;
      }

      /** Loop each row and get it's own key */
      dataState.data.forEach((row, index, array) => {
        keys.set(row, getRowKey(row, index, array));
      });

      return keys;
    },
    [ dataState.data, getRowKey, userDefinedGetRowKey ]
  );


  // ----
  // Data Selectors
  // ----
  const [ selectedKeys, setSelectedKeys ] = React.useState<React.Key[]>(
    userDefinedDefaultSelectedData && selectable
      ? (
        userDefinedDefaultSelectedData
          .filter((row) => dataKeys.has(row))
          .map((row) => dataKeys.get(row) as React.Key)
      )
      : []
  );

  /** Handle selected data change */
  const handleSelectedDataChange = React.useCallback(
    (currentSelected: React.Key[]) => {
      if (typeof onSelectedDataChange === 'function') {
        onSelectedDataChange(dataState.data.filter(row => (
          currentSelected.includes(dataKeys.get(row) as React.Key)
        )));
      }
    },
    [ dataKeys, dataState.data, onSelectedDataChange ]
  );

  // ----
  // Data Selector
  // ----

  const selectAllRows = React.useCallback(
    () => {
      const newSelected: React.Key[] = [];

      dataState.data.forEach((row) => {
        newSelected.push(dataKeys.get(row) as React.Key);
      });

      setSelectedKeys(() => {
        handleSelectedDataChange(newSelected);
        return newSelected;
      });
    },
    [ dataKeys, dataState.data, handleSelectedDataChange ]
  );

  const deselectAllRows = React.useCallback(
    () => {
      const newSelected: React.Key[] = [];
      setSelectedKeys(() => {
        handleSelectedDataChange(newSelected);
        return newSelected;
      });
    },
    [ handleSelectedDataChange ]
  );

  const checkIsRowSelected = React.useCallback(
    (rowToCheck: Data) => {
      const key = dataKeys.get(rowToCheck);

      if (key === undefined) {
        return false;
      }

      return selectedKeys.includes(key);
    },
    [ dataKeys, selectedKeys ]
  );

  const selectRow = React.useCallback(
    (...rows: Data[]) => {
      /** Transform rows into a React.Key array */
      const rowsKey = rows
        .map((row) => dataKeys.get(row))
        .filter((key) => (
          key !== undefined && !selectedKeys.includes(key)
        )) as React.Key[];

      if (rowsKey.length) {
        const newSelected = [ ...selectedKeys, ...rowsKey ];
        setSelectedKeys(() => {
          handleSelectedDataChange(newSelected);
          return newSelected;
        });
      }
    },
    [ dataKeys, handleSelectedDataChange, selectedKeys ]
  );

  const deselectRow = React.useCallback(
    (...rows: Data[]) => {
      /** Transform rows into a React.Key array */
      const rowsKey = rows
        .map((row) => dataKeys.get(row))
        .filter((key) => (
          key !== undefined && selectedKeys.includes(key)
        )) as React.Key[];

      /** Remove found keys */
      if (rowsKey.length) {
        const newSelected = [ ...selectedKeys ].filter((key) => (
          !rowsKey.includes(key)
        ));
        setSelectedKeys(() => {
          handleSelectedDataChange(newSelected);
          return newSelected;
        });
      }
    },
    [ dataKeys, handleSelectedDataChange, selectedKeys ]
  );

  const toggleSelectRow = React.useCallback(
    (rowToToggle: Data) => {
      if (checkIsRowSelected(rowToToggle)) {
        deselectRow(rowToToggle);
      }
      else {
        selectRow(rowToToggle);
      }
    },
    [ checkIsRowSelected, deselectRow, selectRow ]
  );

  /** Deselect all data on change */
  React.useEffect(
    () => {
      /** Update data on second reload or higher */
      if (dataState.reloadCount <= 1) {
        return;
      }

      /** Remove all invalid keys */
      const dataIDs = Array.from(dataKeys.values());

      const newSelected = [ ...selectedKeys ].filter((key) => (
        dataIDs.includes(key)
      ));

      if (newSelected.length !== selectedKeys.length) {
        setSelectedKeys(() => {
          handleSelectedDataChange(newSelected);
          return newSelected;
        });
      }
    },
    [ dataKeys, dataState.reloadCount, handleSelectedDataChange, selectedKeys ]
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

        if (column.filter.type === 'select') {
          return filters[column.key] !== null && filters[column.key] !== undefined;
        }

        if (column.filter.type === 'multi-select') {
          return Array.isArray(filters[column.key]) && filters[column.key].length > 0;
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
    deselectAllRows,
    deselectRow,
    handleRowClick,
    hasFilterRow,
    hasHeaderRow,
    error            : dataState.error,
    filters,
    getRowKey,
    isLoading        : dataState.loading,
    isRowClickEnabled: typeof onRowClick === 'function',
    isRowSelected    : checkIsRowSelected,
    isSelectable     : !!selectable,
    data             : dataState.data,
    setFilter        : handleFilterChange,
    setSorting       : handleChangeSorting,
    tableData        : sortedData,
    isSortReversed,
    selectAllRows,
    selectedCount    : selectedKeys.length,
    selectRow,
    sorting,
    toggleSelectRow
  };
}
