'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var clsx = require('clsx');
var RxTableColumns = require('../../collections/RxTable/RxTableColumns.js');
var RxTableHeader = require('../../collections/RxTable/RxTableHeader.js');
var VirtualizedTable_context = require('./VirtualizedTable.context.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Table Header Render
 * -------- */
var VirtualizedTableFilterRow = function () {
  var _a = VirtualizedTable_context.useVirtualizedTable(),
    columns = _a.columns,
    Components = _a.Components,
    filterRowHeight = _a.filterRowHeight,
    filters = _a.filters,
    setFilter = _a.setFilter;
  return React.createElement(
    Components.FilterRow,
    { className: 'virtualized filter row', style: { height: filterRowHeight } },
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
        React.createElement(RxTableHeader.RxTableFilterElement, {
          columnKey: column.key,
          filter: column.filter,
          filters: filters,
          setFilter: setFilter,
        })
      );
    })
  );
};
var VirtualizedTableHeaderRow = function () {
  var _a = VirtualizedTable_context.useVirtualizedTable(),
    columns = _a.columns,
    Components = _a.Components,
    isSortReversed = _a.isSortReversed,
    setSorting = _a.setSorting,
    sorting = _a.sorting,
    headerHeight = _a.headerHeight;
  return React.createElement(
    Components.HeaderRow,
    { className: 'virtualized row', style: { height: headerHeight } },
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
var VirtualizedTableHeader = function () {
  var _a = VirtualizedTable_context.useVirtualizedTable(),
    Components = _a.Components,
    hasHeaderRow = _a.hasHeaderRow,
    hasFilterRow = _a.hasFilterRow,
    headerHeight = _a.headerHeight,
    filterRowHeight = _a.filterRowHeight;
  /** If has no row, return empty component */
  if (!hasFilterRow && !hasHeaderRow) {
    return null;
  }
  return React.createElement(
    Components.HeaderWrapper,
    { className: 'virtualized table' },
    React.createElement(
      Components.Header,
      { className: 'virtualized head' },
      hasHeaderRow &&
        headerHeight > 0 &&
        React.createElement(VirtualizedTableHeaderRow, null),
      hasFilterRow &&
        filterRowHeight > 0 &&
        React.createElement(VirtualizedTableFilterRow, null)
    )
  );
};
VirtualizedTableHeader.displayName = 'VirtualizedTableHeader';

exports.VirtualizedTableHeader = VirtualizedTableHeader;
//# sourceMappingURL=VirtualizedTableHeader.js.map
