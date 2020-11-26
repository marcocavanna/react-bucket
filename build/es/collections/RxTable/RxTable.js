'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var RxTable_context = require('./RxTable.context.js');
var RxTable_factory = require('./RxTable.factory.js');
var RxTableDefaultComponents = require('./RxTableDefaultComponents.js');
var Table = require('../Table/Table.js');
var RxTableBody = require('./RxTableBody.js');
var RxTableHeader = require('./RxTableHeader.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var RxTable = function (props) {
  var as = props.as,
    className = props.className,
    columns = props.columns,
    userDefinedComponents = props.Components,
    data = props.data,
    defaultData = props.defaultData,
    userDefinedDefaultReverseSorting = props.defaultReverseSorting,
    userDefinedDefaultSort = props.defaultSort,
    disableHeader = props.disableHeader,
    filterLogic = props.filterLogic,
    initiallyLoading = props.initiallyLoading,
    onRowClick = props.onRowClick,
    onSortChange = props.onSortChange,
    reloadDependency = props.reloadDependency,
    reloadSilently = props.reloadSilently,
    userDefinedReverseSorting = props.reverseSorting,
    rowKey = props.rowKey,
    userDefinedSort = props.sort,
    style = props.style,
    rest = _tslib.__rest(props, [
      'as',
      'className',
      'columns',
      'Components',
      'data',
      'defaultData',
      'defaultReverseSorting',
      'defaultSort',
      'disableHeader',
      'filterLogic',
      'initiallyLoading',
      'onRowClick',
      'onSortChange',
      'reloadDependency',
      'reloadSilently',
      'reverseSorting',
      'rowKey',
      'sort',
      'style',
    ]);
  /** Get right element type */
  var ElementType = customHook.useElementType(RxTable, props);
  /** Use RxTable Factory to get Data and Props */
  var rxTableProps = RxTable_factory.useRxTableFactory({
    columns: columns,
    data: data,
    defaultData: defaultData,
    defaultLoading: initiallyLoading,
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
  /** Build the element class list */
  var classes = clsx__default['default'](
    rxTableProps.hasFilterRow && 'filterable',
    'rx-table',
    className
  );
  /* --------
   * Define RxTable Components
   * -------- */
  var Components = _tslib.__assign(
    {
      Body: Table.Body,
      BodyCell: RxTableDefaultComponents.RxTableBodyCell,
      BodyRow: RxTableDefaultComponents.RxTableBodyRow,
      BodyWrapper: React.Fragment,
      Error: RxTableDefaultComponents.RxTableError,
      ErrorRow: Table.Row,
      ErrorCell: Table.Cell,
      FilterCell: RxTableDefaultComponents.RxTableFilterCell,
      FilterRow: Table.Row,
      Header: Table.Header,
      HeaderCell: RxTableDefaultComponents.RxTableHeaderCell,
      HeaderRow: Table.Row,
      HeaderWrapper: React.Fragment,
      Loader: RxTableDefaultComponents.RxTableLoader,
      LoaderRow: Table.Row,
      LoaderCell: Table.Cell,
      NoContent: RxTableDefaultComponents.RxTableNoContent,
      NoContentCell: Table.Cell,
      NoContentRow: Table.Row,
    },
    userDefinedComponents
  );
  /* --------
   * Row Key Getter
   * -------- */
  var getRowKey = React.useCallback(
    function (row, index) {
      if (typeof rowKey === 'function') {
        return rowKey(row, index, rxTableProps.tableData);
      }
      return row[rowKey];
    },
    [rowKey, rxTableProps.tableData]
  );
  /* --------
   * Context Building
   * -------- */
  var rxTableContext = _tslib.__assign(_tslib.__assign({}, rxTableProps), {
    Components: Components,
    columns: columns,
    getRowKey: getRowKey,
  });
  /* --------
   * Component Render
   * -------- */
  return React.createElement(
    RxTable_context.RxTableProvider,
    { value: rxTableContext },
    React.createElement(
      ElementType,
      _tslib.__assign({ className: classes }, rest),
      React.createElement(RxTableHeader.RxTableHeader, null),
      React.createElement(RxTableBody.RxTableBody, null)
    )
  );
};
RxTable.displayName = 'RxTable';
RxTable.defaultProps = {
  as: Table,
  filterLogic: 'and',
  initiallyLoading: true,
  reloadSilently: true,
};

module.exports = RxTable;
//# sourceMappingURL=RxTable.js.map
