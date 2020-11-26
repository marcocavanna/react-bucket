'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var clsx = require('clsx');
var RxTable_context = require('./RxTable.context.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

var RxTableBodyCell = function (props) {
  var className = props.className,
    Component = props.Component,
    column = props.column,
    tableData = props.tableData,
    index = props.index,
    row = props.row;
  var classes = clsx__default['default'](
    column.textAlign && 'has-text-' + column.textAlign,
    column.className,
    className
  );
  return React.createElement(Component, {
    className: classes,
    column: column,
    tableData: tableData,
    index: index,
    row: row,
  });
};
/* --------
 * Single Row Component
 * -------- */
var RxTableRow = function (props) {
  /** Extract index from Props */
  var index = props.index;
  var _a = RxTable_context.useRxTable(),
    columns = _a.columns,
    Components = _a.Components,
    tableData = _a.tableData,
    isRowClickEnabled = _a.isRowClickEnabled,
    superHandleRowClick = _a.handleRowClick;
  /** Get Row Data */
  var row = tableData[index];
  /** Build row classes */
  var classes = clsx__default['default']({
    last: index === tableData.length - 1,
    first: index === 0,
    clickable: isRowClickEnabled,
  });
  /* --------
   * Handlers
   * -------- */
  var handleRowClick = React.useCallback(
    function () {
      superHandleRowClick(index);
    },
    [superHandleRowClick, index]
  );
  /* --------
   * Return the Component
   * -------- */
  return React.createElement(
    Components.BodyRow,
    {
      className: classes,
      columns: columns,
      index: index,
      onClick: isRowClickEnabled ? handleRowClick : undefined,
      row: row,
    },
    columns.map(function (column) {
      return React.createElement(RxTableBodyCell, {
        key: column.key,
        Component: Components.BodyCell,
        column: column,
        tableData: tableData,
        index: index,
        row: row,
      });
    })
  );
};
/* --------
 * Main Component Definition
 * -------- */
var RxTableBody = function () {
  var _a = RxTable_context.useRxTable(),
    columns = _a.columns,
    Components = _a.Components,
    error = _a.error,
    filters = _a.filters,
    isLoading = _a.isLoading,
    tableData = _a.tableData,
    getRowKey = _a.getRowKey;
  /** Show the Loader while requesting data */
  if (isLoading) {
    return React.createElement(
      Components.BodyWrapper,
      null,
      React.createElement(
        Components.Body,
        null,
        React.createElement(
          Components.LoaderRow,
          { className: 'loading-row' },
          React.createElement(
            Components.LoaderCell,
            { colSpan: columns.length, className: 'loading-cell' },
            React.createElement(Components.Loader, null)
          )
        )
      )
    );
  }
  /** If an error occurred, show dedicated component */
  if (error) {
    return React.createElement(
      Components.BodyWrapper,
      null,
      React.createElement(
        Components.Body,
        null,
        React.createElement(
          Components.ErrorRow,
          { className: 'error-row' },
          React.createElement(
            Components.ErrorCell,
            { colSpan: columns.length, className: 'error-cell' },
            React.createElement(Components.Error, { error: error })
          )
        )
      )
    );
  }
  /** Render no Content */
  if (!tableData.length) {
    return React.createElement(
      Components.BodyWrapper,
      null,
      React.createElement(
        Components.Body,
        null,
        React.createElement(
          Components.NoContentRow,
          { className: 'no-content-row' },
          React.createElement(
            Components.NoContentCell,
            { colSpan: columns.length, className: 'no-content-cell' },
            React.createElement(Components.NoContent, { filters: filters })
          )
        )
      )
    );
  }
  /** Render Data */
  return React.createElement(
    Components.BodyWrapper,
    null,
    React.createElement(
      Components.Body,
      null,
      tableData.map(function (row, index) {
        return React.createElement(RxTableRow, {
          key: getRowKey(row, index, tableData),
          index: index,
        });
      })
    )
  );
};

exports.RxTableBody = RxTableBody;
exports.RxTableBodyCell = RxTableBodyCell;
//# sourceMappingURL=RxTableBody.js.map
