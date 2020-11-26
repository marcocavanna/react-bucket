'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Loader = require('../../elements/Loader/Loader.js');
var Message = require('../Message/Message.js');
var RxTable_context = require('./RxTable.context.js');
var Box = require('../../elements/Box/Box.js');
var EmptyContent = require('../../elements/EmptyContent/EmptyContent.js');
var TableCell = require('../Table/TableCell.js');
var TableHeaderCell = require('../Table/TableHeaderCell.js');
var TableRow = require('../Table/TableRow.js');

/* --------
 * Table Header Cell
 * -------- */
var RxTableHeaderCell = function (props) {
  var className = props.className,
    content = props.content,
    hasSorting = props.hasSorting,
    isActualSortingColumn = props.isActualSortingColumn,
    isReversedSorting = props.isReversedSorting,
    onClick = props.onClick;
  return TableHeaderCell.create(content, {
    autoGenerateKey: false,
    defaultProps: {
      className: className,
    },
    overrideProps: function (defaultProps) {
      return {
        sortable: hasSorting,
        sorted: isActualSortingColumn
          ? isReversedSorting
            ? 'desc'
            : 'asc'
          : undefined,
        onClick: function (event) {
          if (onClick) {
            onClick();
          }
          if (defaultProps.onClick) {
            defaultProps.onClick(event);
          }
        },
      };
    },
  });
};
RxTableHeaderCell.displayName = 'RxTableHeaderCell';
/* --------
 * Table Body Row Component
 * -------- */
var RxTableBodyRow = function (props) {
  var children = props.children,
    className = props.className,
    onClick = props.onClick;
  return React.createElement(
    TableRow,
    { className: className, onClick: onClick },
    children
  );
};
RxTableBodyRow.displayName = 'RxTableBodyRow';
/* --------
 * Table Cell Component
 * -------- */
var RxTableBodyCell = function (props) {
  var className = props.className,
    column = props.column,
    data = props.data,
    index = props.index,
    row = props.row;
  /** Render the Cell with function if exists */
  if (typeof column.render === 'function') {
    return React.createElement(
      TableCell,
      { className: className },
      column.render(row, index, data)
    );
  }
  /** Render Cell with Cell Shorthand Definition */
  if (column.cell) {
    var metaContent =
      typeof column.cell.meta === 'function'
        ? column.cell.meta(row, index, data)
        : column.cell.meta;
    var headerContent =
      typeof column.cell.header === 'function'
        ? column.cell.header(row, index, data)
        : column.cell.header;
    var contentContent =
      typeof column.cell.content === 'function'
        ? column.cell.content(row, index, data)
        : column.cell.content;
    return React.createElement(TableCell, {
      className: className,
      header: headerContent,
      meta: metaContent,
      content: contentContent,
    });
  }
  /** Render using the key */
  return React.createElement(TableCell, {
    header: row[column.key],
    className: className,
  });
};
RxTableBodyCell.displayName = 'RxTableBodyCell';
/* --------
 * Table Filter Cell
 * -------- */
var RxTableFilterCell = function (props) {
  var className = props.className,
    children = props.children;
  return React.createElement(
    TableHeaderCell,
    { className: className },
    children
  );
};
RxTableFilterCell.displayName = 'RxTableFilterCell';
/* --------
 * Loader Element
 * -------- */
var RxTableLoader = function () {
  return React.createElement(
    Box,
    { py: 4 },
    React.createElement(Loader, {
      centered: true,
      active: true,
      size: 'large',
      type: 'dots',
      content: 'Loading Data',
    })
  );
};
RxTableLoader.displayName = 'RxTableLoader';
/* --------
 * Error Element
 * -------- */
var RxTableError = function () {
  return React.createElement(Message, {
    danger: true,
    header: 'An error occurred while loading data',
  });
};
RxTableError.displayName = 'RxTableError';
/* --------
 * No Content Element
 * -------- */
var RxTableNoContent = function () {
  var data = RxTable_context.useRxTable().data;
  if (!data.length) {
    return React.createElement(EmptyContent, {
      header: 'No Data',
      content: 'No data to show',
    });
  }
  return React.createElement(EmptyContent, {
    header: 'No Data to Show',
    content: 'No data to show for current filters',
  });
};
RxTableNoContent.displayName = 'RxTableNoContent';

exports.RxTableBodyCell = RxTableBodyCell;
exports.RxTableBodyRow = RxTableBodyRow;
exports.RxTableError = RxTableError;
exports.RxTableFilterCell = RxTableFilterCell;
exports.RxTableHeaderCell = RxTableHeaderCell;
exports.RxTableLoader = RxTableLoader;
exports.RxTableNoContent = RxTableNoContent;
//# sourceMappingURL=RxTableDefaultComponents.js.map
