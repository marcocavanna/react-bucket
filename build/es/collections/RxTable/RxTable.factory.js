'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var useAutoControlledValue = require('../../hooks/useAutoControlledValue.js');
var arraySort = require('array-sort');
var areEqualStringArray = require('./lib/areEqualStringArray.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var arraySort__default = /*#__PURE__*/ _interopDefaultLegacy(arraySort);

/* --------
 * Hook Definition
 * -------- */
function useRxTableFactory(config) {
  var _this = this;
  // ----
  // Code Destructuring
  // ----
  var columns = config.columns,
    data = config.data,
    defaultData = config.defaultData,
    defaultLoading = config.defaultLoading,
    userDefinedDefaultReverseSorting = config.defaultReverseSorting,
    userDefinedDefaultSort = config.defaultSort,
    filterLogic = config.filterLogic,
    onRowClick = config.onRowClick,
    onSortChange = config.onSortChange,
    reloadDependency = config.reloadDependency,
    reloadSilently = config.reloadSilently,
    userDefinedReverseSorting = config.reverseSorting,
    userDefinedSort = config.sort;
  // ----
  // Checker Builder
  // ----
  var hasFilterRow = React.useMemo(
    function () {
      return columns.some(function (column) {
        return !!column.filter;
      });
    },
    [columns]
  );
  var hasHeaderRow = React.useMemo(
    function () {
      return columns.some(function (column) {
        return !!column.header;
      });
    },
    [columns]
  );
  // ----
  // Data Management and Load
  // ----
  /** Build the data state */
  var _a = React.useState({
      data: Array.isArray(data)
        ? data
        : defaultData !== null && defaultData !== void 0
        ? defaultData
        : [],
      error: null,
      loading:
        defaultLoading !== null && defaultLoading !== void 0
          ? defaultLoading
          : typeof data === 'function',
      lastReloadTimeStamp: 0,
    }),
    dataState = _a[0],
    setDataState = _a[1];
  /** Build the load data function */
  var loadData = React.useCallback(
    function () {
      return _tslib.__awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return _tslib.__generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              /**
               * If data is a plain a plain
               * array object then there is no
               * need to wait for data load
               */
              if (Array.isArray(data)) {
                setDataState({
                  data: data,
                  loading: false,
                  error: null,
                  lastReloadTimeStamp: Date.now(),
                });
                return [2 /*return*/];
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
                setDataState(function (curr) {
                  return _tslib.__assign(_tslib.__assign({}, curr), {
                    loading: true,
                  });
                });
              }
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [4 /*yield*/, data(Date.now())];
            case 2:
              result = _a.sent();
              setDataState({
                data: result,
                loading: false,
                error: null,
                lastReloadTimeStamp: Date.now(),
              });
              return [3 /*break*/, 4];
            case 3:
              error_1 = _a.sent();
              setDataState({
                data: [],
                loading: false,
                error: error_1,
                lastReloadTimeStamp: Date.now(),
              });
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [data, dataState.loading, reloadSilently]
  );
  /** Build the effect used to load/reload data */
  React.useEffect(
    function () {
      loadData();
    },
    [loadData, reloadDependency]
  );
  // ----
  // Filtering Data
  // ----
  var _b = React.useState(
      columns.reduce(function (acc, column) {
        if (column.filter) {
          acc[column.key] = column.filter.initialValue;
        }
        return acc;
      }, {})
    ),
    filters = _b[0],
    setFilteringValues = _b[1];
  var handleFilterChange = React.useCallback(
    function (columnKey, value) {
      setFilteringValues(function (curr) {
        var _a;
        return _tslib.__assign(
          _tslib.__assign({}, curr),
          ((_a = {}), (_a[columnKey] = value), _a)
        );
      });
    },
    [setFilteringValues]
  );
  var filteredData = React.useMemo(
    function () {
      /** If no filter, return entire data */
      if (!hasFilterRow) {
        return dataState.data;
      }
      /** Get only filter columns */
      var filterColumns = columns.filter(function (column) {
        if (!column.filter) {
          return false;
        }
        if (column.filter.type === 'input') {
          return (
            typeof filters[column.key] === 'string' &&
            !!filters[column.key].length
          );
        }
        if (column.filter.type === 'checkbox') {
          return (
            typeof filters[column.key] === 'boolean' && !!filters[column.key]
          );
        }
        return false;
      });
      /** If no columns are able to filter data, return entire data set */
      if (!filterColumns.length) {
        return dataState.data;
      }
      /** Filter data using columns */
      return dataState.data.filter(function (row, index, array) {
        return filterColumns.reduce(function (show, next) {
          return filterLogic === 'and'
            ? show && next.filter.show(filters[next.key], row, index, array)
            : show || next.filter.show(filters[next.key], row, index, array);
        }, filterLogic === 'and');
      });
    },
    [columns, dataState.data, filterLogic, filters, hasFilterRow]
  );
  // ----
  // Sorting Controller
  // ----
  var _c = useAutoControlledValue.useAutoControlledValue([], {
      defaultProp: userDefinedDefaultSort,
      prop: userDefinedSort,
    }),
    sorting = _c[0],
    trySetSorting = _c[1];
  var _d = useAutoControlledValue.useAutoControlledValue(false, {
      defaultProp: userDefinedDefaultReverseSorting,
      prop: userDefinedReverseSorting,
    }),
    isSortReversed = _d[0],
    trySetReverseSorting = _d[1];
  var handleChangeSorting = React.useCallback(
    function (newSorting, reverse) {
      /** Check if sorting is changed */
      var isSortChanged = !areEqualStringArray(sorting, newSorting);
      var isReversingChanged = reverse !== isSortReversed;
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
    [onSortChange, isSortReversed, sorting, trySetReverseSorting, trySetSorting]
  );
  var sortedData = React.useMemo(
    function () {
      if (sorting.length) {
        return arraySort__default['default'](filteredData, sorting, {
          reverse: isSortReversed,
        });
      }
      return filteredData;
    },
    [filteredData, isSortReversed, sorting]
  );
  // ----
  // Internal Handlers
  // ----
  var handleRowClick = React.useCallback(
    function (index) {
      if (onRowClick) {
        onRowClick(sortedData[index], index, sortedData);
      }
    },
    [onRowClick, sortedData]
  );
  return {
    handleRowClick: handleRowClick,
    hasFilterRow: hasFilterRow,
    hasHeaderRow: hasHeaderRow,
    error: dataState.error,
    filters: filters,
    isLoading: dataState.loading,
    isRowClickEnabled: typeof onRowClick === 'function',
    data: dataState.data,
    setFilter: handleFilterChange,
    setSorting: handleChangeSorting,
    tableData: sortedData,
    isSortReversed: isSortReversed,
    sorting: sorting,
  };
}

exports.useRxTableFactory = useRxTableFactory;
//# sourceMappingURL=RxTable.factory.js.map
