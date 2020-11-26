'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var Checkbox = require('../../elements/Checkbox/Checkbox.js');
var Input = require('../../elements/Input/Input.js');
var RxTable_context = require('./RxTable.context.js');
var RxTableColumns = require('./RxTableColumns.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

var RxTableFilterElement = function (props) {
  var columnKey = props.columnKey,
    filter = props.filter,
    filters = props.filters,
    setFilter = props.setFilter;
  /** Build Handlers */
  var filterValue = filters[columnKey];
  var handleFilterChange = React.useCallback(
    function (e, filterProps) {
      if (filter) {
        if (filter.type === 'input') {
          setFilter(columnKey, filterProps.value);
        } else if (filter.type === 'checkbox') {
          setFilter(columnKey, !filterValue);
        }
      }
    },
    [setFilter, filter, filterValue, columnKey]
  );
  /** If no type, return no filter */
  if (!filter) {
    return null;
  }
  /** Return the right filter */
  if (filter.type === 'input') {
    return React.createElement(
      Input,
      _tslib.__assign({ icon: 'filter' }, filter.props, {
        value: filters[columnKey],
        onChange: handleFilterChange,
      })
    );
  }
  if (filter.type === 'checkbox') {
    return React.createElement(
      Checkbox,
      _tslib.__assign({}, filter.props, {
        checked: !!filters[columnKey],
        onChange: handleFilterChange,
      })
    );
  }
  return null;
};
var RxTableFilterRow = function () {
  var _a = RxTable_context.useRxTable(),
    columns = _a.columns,
    Components = _a.Components,
    filters = _a.filters,
    setFilter = _a.setFilter;
  return React.createElement(
    Components.FilterRow,
    null,
    columns.map(function (column) {
      /** Build className */
      var classes = clsx__default['default'](
        'filter',
        column.textAlign && 'has-text-' + column.textAlign
      );
      /** Return the Filter */
      return React.createElement(
        Components.FilterCell,
        { key: column.key, className: classes, column: column },
        React.createElement(RxTableFilterElement, {
          columnKey: column.key,
          filter: column.filter,
          setFilter: setFilter,
          filters: filters,
        })
      );
    })
  );
};
/* --------
 * Table Header Render
 * -------- */
var RxTableHeaderRow = function () {
  var _a = RxTable_context.useRxTable(),
    columns = _a.columns,
    Components = _a.Components,
    isSortReversed = _a.isSortReversed,
    setSorting = _a.setSorting,
    sorting = _a.sorting;
  return React.createElement(
    Components.HeaderRow,
    null,
    columns.map(function (column) {
      return React.createElement(RxTableColumns.RxTableHeaderTitleColumn, {
        key: column.key,
        column: column,
        Component: Components.HeaderCell,
        isSortReversed: isSortReversed,
        onSortChange: setSorting,
        tableSorting: sorting,
      });
    })
  );
};
/* --------
 * Component Definition
 * -------- */
var RxTableHeader = function () {
  var _a = RxTable_context.useRxTable(),
    Components = _a.Components,
    hasHeaderRow = _a.hasHeaderRow,
    hasFilterRow = _a.hasFilterRow;
  /** If table has no header or filter row, return an empty component */
  if (!hasFilterRow && !hasHeaderRow) {
    return null;
  }
  /** Return wrapped rows */
  return React.createElement(
    Components.HeaderWrapper,
    null,
    React.createElement(
      Components.Header,
      null,
      hasHeaderRow && React.createElement(RxTableHeaderRow, null),
      hasFilterRow && React.createElement(RxTableFilterRow, null)
    )
  );
};
RxTableHeader.displayName = 'RxTableHeader';

exports.RxTableFilterElement = RxTableFilterElement;
exports.RxTableHeader = RxTableHeader;
//# sourceMappingURL=RxTableHeader.js.map
