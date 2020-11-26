'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var RxTable_factory = require('../../collections/RxTable/RxTable.factory.js');
var RxTableDefaultComponents = require('../../collections/RxTable/RxTableDefaultComponents.js');
var VirtualizedTable_context = require('./VirtualizedTable.context.js');
var VirtualizedTableBody = require('./VirtualizedTableBody.js');
var VirtualizedTableDefaultComponents = require('./VirtualizedTableDefaultComponents.js');
var VirtualizedTableHeader = require('./VirtualizedTableHeader.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var VirtualizedTable = function (props) {
  var // Virtualized Table Props
    columns = props.columns,
    userDefinedComponents = props.Components,
    data = props.data,
    defaultData = props.defaultData,
    userDefinedDefaultLoading = props.defaultLoading,
    userDefinedDefaultReverseSorting = props.defaultReverseSorting,
    userDefinedDefaultSort = props.defaultSort,
    disableHeader = props.disableHeader,
    filterLogic = props.filterLogic,
    userDefinedFilterRowHeight = props.filterRowHeight,
    userDefinedHeaderHeight = props.headerHeight,
    height = props.height,
    onRowClick = props.onRowClick,
    onSortChange = props.onSortChange,
    reloadDependency = props.reloadDependency,
    reloadSilently = props.reloadSilently,
    userDefinedReverseSorting = props.reverseSorting,
    rowHeight = props.rowHeight,
    userDefinedSort = props.sort,
    style = props.style,
    width = props.width,
    // Extracted Variable Size List Props
    direction = props.direction,
    itemKey = props.itemKey,
    overscanCount = props.overscanCount,
    onItemsRendered = props.onItemsRendered,
    onScroll = props.onScroll,
    useIsScrolling = props.useIsScrolling,
    // Remove Children
    children = props.children,
    rest = _tslib.__rest(props, [
      'columns',
      'Components',
      'data',
      'defaultData',
      'defaultLoading',
      'defaultReverseSorting',
      'defaultSort',
      'disableHeader',
      'filterLogic',
      'filterRowHeight',
      'headerHeight',
      'height',
      'onRowClick',
      'onSortChange',
      'reloadDependency',
      'reloadSilently',
      'reverseSorting',
      'rowHeight',
      'sort',
      'style',
      'width',
      'direction',
      'itemKey',
      'overscanCount',
      'onItemsRendered',
      'onScroll',
      'useIsScrolling',
      'children',
    ]);
  /** Use RxTable Factory to get Data and Props */
  var rxTableProps = RxTable_factory.useRxTableFactory({
    columns: columns,
    data: data,
    defaultData: defaultData,
    defaultLoading: userDefinedDefaultLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSort: userDefinedDefaultSort,
    filterLogic: filterLogic,
    onRowClick: onRowClick,
    onSortChange: onSortChange,
    reloadDependency: reloadDependency,
    reloadSilently: reloadSilently,
    reverseSorting: userDefinedReverseSorting,
    sort: userDefinedSort,
  });
  /* --------
   * Compute Table Width and Height and Accessor
   * -------- */
  var headerHeight =
    typeof userDefinedHeaderHeight === 'number'
      ? userDefinedHeaderHeight
      : typeof rowHeight === 'number'
      ? rowHeight
      : 0;
  var filterRowHeight = rxTableProps.hasFilterRow
    ? typeof userDefinedFilterRowHeight === 'number'
      ? userDefinedFilterRowHeight
      : headerHeight
    : 0;
  var columnsWidthSum = columns.reduce(function (tot, _a) {
    var columnWidth = _a.width;
    return tot + columnWidth;
  }, 0);
  var effectiveWidth = Math.max(columnsWidthSum, width);
  var tableBodyHeight =
    height - (!disableHeader ? headerHeight : 0) - filterRowHeight;
  /* --------
   * Build the Components
   * -------- */
  var Components = _tslib.__assign(
    {
      Body: 'div',
      BodyCell: VirtualizedTableDefaultComponents.VirtualizedTableBodyCell,
      BodyRow: VirtualizedTableDefaultComponents.VirtualizedTableBodyRow,
      BodyWrapper: 'div',
      Error: RxTableDefaultComponents.RxTableError,
      ErrorRow: 'div',
      ErrorCell: 'div',
      FilterCell: VirtualizedTableDefaultComponents.VirtualizedTableFilterCell,
      FilterRow: 'div',
      Header: 'div',
      HeaderCell: VirtualizedTableDefaultComponents.VirtualizedTableHeaderCell,
      HeaderRow: 'div',
      HeaderWrapper: 'div',
      Loader: RxTableDefaultComponents.RxTableLoader,
      LoaderRow: 'div',
      LoaderCell: 'div',
      NoContent: VirtualizedTableDefaultComponents.VirtualizedTableNoContent,
      NoContentCell: 'div',
      NoContentRow: 'div',
    },
    userDefinedComponents
  );
  /* --------
   * Build Classes
   * -------- */
  var wrapperClasses = clsx__default['default']('virtualized-table');
  /* --------
   * Memoized Properties
   * -------- */
  var wrapperStyle = React.useMemo(
    function () {
      return _tslib.__assign(
        {
          height: height + 'px',
          width: width + 'px',
          overflow: 'auto',
          maxHeight: '100vh',
          minHeight: '200px',
        },
        style
      );
    },
    [height, width, style]
  );
  /* --------
   * VirtualList Methods
   * -------- */
  var estimatedItemSize = typeof rowHeight === 'number' ? rowHeight : undefined;
  var getRowHeight = React.useCallback(
    function (index) {
      if (typeof rowHeight === 'number') {
        return rowHeight;
      }
      return rowHeight(index);
    },
    [rowHeight]
  );
  /* --------
   * Build the Context
   * -------- */
  var virtualizedTableContext = _tslib.__assign(
    _tslib.__assign({}, rxTableProps),
    {
      columns: columns,
      Components: Components,
      effectiveWidth: effectiveWidth,
      filterRowHeight: filterRowHeight,
      headerHeight: headerHeight,
      height: tableBodyHeight,
      getRowHeight: getRowHeight,
      width: width,
    }
  );
  /* --------
   * Component Render
   * -------- */
  return React.createElement(
    'div',
    _tslib.__assign({ className: wrapperClasses, style: wrapperStyle }, rest),
    React.createElement(
      VirtualizedTable_context.VirtualizedTableProvider,
      { value: virtualizedTableContext },
      !disableHeader &&
        React.createElement(
          VirtualizedTableHeader.VirtualizedTableHeader,
          null
        ),
      React.createElement(VirtualizedTableBody.VirtualizedTableBody, {
        direction: direction,
        estimatedItemSize: estimatedItemSize,
        itemKey: itemKey,
        overscanCount: overscanCount,
        onItemsRendered: onItemsRendered,
        onScroll: onScroll,
        useIsScrolling: useIsScrolling,
      })
    )
  );
};
VirtualizedTable.displayName = 'VirtualizedTable';
VirtualizedTable.defaultProps = {
  filterLogic: 'and',
  reloadSilently: true,
};

module.exports = VirtualizedTable;
//# sourceMappingURL=VirtualizedTable.js.map
