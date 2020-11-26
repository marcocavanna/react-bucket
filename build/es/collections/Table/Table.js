'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var TableCell = require('./TableCell.js');
var TableHeaderCell = require('./TableHeaderCell.js');
var TableRow = require('./TableRow.js');
var TableBody = require('./TableBody.js');
var TableFooter = require('./TableFooter.js');
var TableHeader = require('./TableHeader.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Table = function (props) {
  var as = props.as,
    children = props.children,
    className = props.className,
    compressed = props.compressed,
    content = props.content,
    responsive = props.responsive,
    rows = props.rows,
    sortable = props.sortable,
    tableData = props.tableData,
    rest = _tslib.__rest(props, [
      'as',
      'children',
      'className',
      'compressed',
      'content',
      'responsive',
      'rows',
      'sortable',
      'tableData',
    ]);
  // @ts-ignore
  var ElementType = customHook.useElementType(Table, props);
  var classes = clsx__default['default'](
    {
      compressed: compressed,
      sortable: sortable,
    },
    'table',
    className
  );
  // ----
  // Build Table Header
  // ----
  var headerRows =
    (rows === null || rows === void 0 ? void 0 : rows.header) &&
    rows.header.map(function (row) {
      return TableRow.create(row, {
        autoGenerateKey: true,
        defaultProps: { cellAs: TableHeaderCell },
      });
    });
  // ----
  // Build Table Footer
  // ----
  var footerRows =
    (rows === null || rows === void 0 ? void 0 : rows.footer) &&
    rows.footer.map(function (row) {
      return TableRow.create(row, {
        autoGenerateKey: true,
        defaultProps: { cellAs: TableCell },
      });
    });
  if (!reactUiCore.childrenUtils.isNil(children)) {
    var tableElementWithChildren = React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      !!headerRows && React.createElement(TableHeader, { content: headerRows }),
      children,
      !!footerRows && React.createElement(TableFooter, { content: footerRows })
    );
    return responsive
      ? React.createElement(
          'div',
          { className: 'responsive-table' },
          tableElementWithChildren
        )
      : tableElementWithChildren;
  }
  // ----
  // Build Table Body
  // ----
  var bodyRows =
    (rows === null || rows === void 0 ? void 0 : rows.body) &&
    Array.isArray(tableData) &&
    (typeof rows.body === 'function'
      ? tableData.map(function (data, index, array) {
          return TableRow.create(rows.body(data, index, array), {
            autoGenerateKey: true,
            defaultProps: { cellAs: TableCell },
          });
        })
      : rows.body.map(function (row) {
          return TableRow.create(row, {
            autoGenerateKey: true,
            defaultProps: { cellAs: TableCell },
          });
        }));
  var tableElement = React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    !!headerRows && React.createElement(TableHeader, { content: headerRows }),
    !!bodyRows && React.createElement(TableBody, { content: bodyRows }),
    !!footerRows && React.createElement(TableFooter, { content: footerRows })
  );
  return responsive
    ? React.createElement(
        'div',
        { className: 'responsive-table' },
        tableElement
      )
    : tableElement;
};
Table.displayName = 'Table';
Table.Body = TableBody;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.Row = TableRow;
Table.defaultProps = {
  as: 'table',
};

module.exports = Table;
//# sourceMappingURL=Table.js.map
