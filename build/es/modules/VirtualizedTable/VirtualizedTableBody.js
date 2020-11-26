'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var RxTableBody = require('../../collections/RxTable/RxTableBody.js');
var VirtualizedTable_context = require('./VirtualizedTable.context.js');
var reactWindow = require('react-window');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Render each row
 * -------- */
var VirtualizedTableRow = function (props) {
  var index = props.index,
    style = props.style;
  var _a = VirtualizedTable_context.useVirtualizedTable(),
    columns = _a.columns,
    Components = _a.Components,
    tableData = _a.tableData,
    getRowHeight = _a.getRowHeight,
    isRowClickEnabled = _a.isRowClickEnabled,
    superHandleRowClick = _a.handleRowClick;
  /** Get Row Data */
  var row = tableData[index];
  /** Get the Current row Size */
  var rowHeight = getRowHeight(index);
  /** Build row classes */
  var classes = clsx__default['default']('virtualized row', {
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
      style: _tslib.__assign(_tslib.__assign({}, style), { height: rowHeight }),
      row: row,
    },
    columns.map(function (column) {
      return React.createElement(RxTableBody.RxTableBodyCell, {
        className: 'virtualized cell',
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
var MemoizedVirtualizedTableRow = React.memo(
  VirtualizedTableRow,
  reactWindow.areEqual
);
/* --------
 * The inner element that will wrap
 * each virtualized row
 * It is the full height scrolling element
 * -------- */
var VirtualizedBody = function (props) {
  var children = props.children,
    className = props.className,
    rest = _tslib.__rest(props, ['children', 'className']);
  var Components = VirtualizedTable_context.useVirtualizedTable().Components;
  var classes = clsx__default['default']('virtualized body', className);
  return React.createElement(
    Components.Body,
    _tslib.__assign({ className: classes }, rest),
    children
  );
};
/* --------
 * Outer Element
 * It will render the outer wrapper div
 * of the Virtualized Table
 * It is the fixed height/width element
 * -------- */
var VirtualizedBodyWrapper = React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    rest = _tslib.__rest(props, ['children', 'className']);
  var Components = VirtualizedTable_context.useVirtualizedTable().Components;
  var classes = clsx__default['default']('virtualized table', className);
  return React.createElement(
    Components.BodyWrapper,
    _tslib.__assign({ ref: ref, className: classes }, rest),
    children
  );
});
var VirtualizedTableBody = function (props) {
  var _a = VirtualizedTable_context.useVirtualizedTable(),
    columns = _a.columns,
    Components = _a.Components,
    effectiveWidth = _a.effectiveWidth,
    error = _a.error,
    getRowHeight = _a.getRowHeight,
    height = _a.height,
    filters = _a.filters,
    isLoading = _a.isLoading,
    tableData = _a.tableData;
  var direction = props.direction,
    estimatedItemSize = props.estimatedItemSize,
    itemKey = props.itemKey,
    overscanCount = props.overscanCount,
    onItemsRendered = props.onItemsRendered,
    onScroll = props.onScroll,
    useIsScrolling = props.useIsScrolling;
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
  return React.createElement(
    reactWindow.VariableSizeList,
    {
      direction: direction,
      itemKey: itemKey,
      overscanCount: overscanCount,
      onItemsRendered: onItemsRendered,
      onScroll: onScroll,
      useIsScrolling: useIsScrolling,
      width: effectiveWidth,
      height: height,
      itemSize: getRowHeight,
      estimatedItemSize: estimatedItemSize,
      itemCount: tableData.length,
      innerElementType: VirtualizedBody,
      outerElementType: VirtualizedBodyWrapper,
    },
    MemoizedVirtualizedTableRow
  );
};
VirtualizedTableBody.displayName = 'VirtualizedTableBody';

exports.VirtualizedTableBody = VirtualizedTableBody;
//# sourceMappingURL=VirtualizedTableBody.js.map
