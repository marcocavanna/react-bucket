'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var EmptyContent = require('../../elements/EmptyContent/EmptyContent.js');
var TableCellContent = require('../../collections/Table/TableCellContent.js');
var TableHeaderCell = require('../../collections/Table/TableHeaderCell.js');
var VirtualizedTable_context = require('./VirtualizedTable.context.js');

/* --------
 * Virtualized Table Header Cell
 * -------- */
var VirtualizedTableHeaderCell = function (props) {
  var className = props.className,
    content = props.content,
    column = props.column,
    hasSorting = props.hasSorting,
    isActualSortingColumn = props.isActualSortingColumn,
    isReversedSorting = props.isReversedSorting,
    onClick = props.onClick;
  return TableHeaderCell.create(
    content !== null && content !== void 0 ? content : '',
    {
      autoGenerateKey: false,
      defaultProps: {
        className: className,
      },
      overrideProps: function (defaultProps) {
        return {
          as: 'div',
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
          style: {
            width: column.width,
            flexBasis: column.width,
          },
        };
      },
    }
  );
};
VirtualizedTableHeaderCell.displayName = 'VirtualizedTableHeaderCell';
/* --------
 * Virtualized Table Cell
 * -------- */
var VirtualizedTableBodyCell = function (props) {
  var _a, _b;
  var className = props.className,
    column = props.column,
    data = props.data,
    index = props.index,
    row = props.row;
  /** Build style */
  var style = {
    width: (_a = column.width) !== null && _a !== void 0 ? _a : 0,
    flexBasis: (_b = column.width) !== null && _b !== void 0 ? _b : 0,
  };
  /** Render the Cell with function if exists */
  if (typeof column.render === 'function') {
    return React.createElement(
      'div',
      { className: className, style: style },
      React.createElement(
        'div',
        { className: 'virtualized cell-content' },
        column.render(row, index, data)
      )
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
    return React.createElement(
      'div',
      { className: className, style: style },
      React.createElement(
        'div',
        { className: 'virtualized cell-content' },
        TableCellContent.create(metaContent, {
          autoGenerateKey: false,
          overrideProps: {
            type: 'meta',
          },
        }),
        TableCellContent.create(headerContent, {
          autoGenerateKey: false,
          overrideProps: {
            type: 'title',
          },
        }),
        TableCellContent.create(contentContent, {
          autoGenerateKey: false,
          overrideProps: {
            type: 'content',
          },
        })
      )
    );
  }
  /** Render using the key */
  return React.createElement(
    'div',
    { className: className, style: style },
    React.createElement(
      'div',
      { className: 'virtualized cell-content' },
      TableCellContent.create(row[column.key], {
        autoGenerateKey: false,
        overrideProps: {
          type: 'title',
        },
      })
    )
  );
};
VirtualizedTableBodyCell.displayName = 'VirtualizedTableBodyCell';
/* --------
 * Table Row
 * -------- */
var VirtualizedTableBodyRow = function (props) {
  var children = props.children,
    className = props.className,
    onClick = props.onClick,
    style = props.style;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement(
      'div',
      { className: className, style: style, onClick: onClick },
      children
    )
  );
};
VirtualizedTableBodyRow.displayName = 'VirtualizedTableBodyRow';
/* --------
 * Table Filter Cell
 * -------- */
var VirtualizedTableFilterCell = function (props) {
  var className = props.className,
    children = props.children,
    column = props.column;
  return React.createElement(
    'div',
    {
      className: className,
      style: { width: column.width, flexBasis: column.width },
    },
    children
  );
};
VirtualizedTableFilterCell.displayName = 'VirtualizedTableFilterCell';
/* --------
 * No Content Element
 * -------- */
var VirtualizedTableNoContent = function () {
  var data = VirtualizedTable_context.useVirtualizedTable().data;
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
VirtualizedTableNoContent.displayName = 'VirtualizedTableNoContent';

exports.VirtualizedTableBodyCell = VirtualizedTableBodyCell;
exports.VirtualizedTableBodyRow = VirtualizedTableBodyRow;
exports.VirtualizedTableFilterCell = VirtualizedTableFilterCell;
exports.VirtualizedTableHeaderCell = VirtualizedTableHeaderCell;
exports.VirtualizedTableNoContent = VirtualizedTableNoContent;
//# sourceMappingURL=VirtualizedTableDefaultComponents.js.map
