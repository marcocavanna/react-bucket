import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';
import TableCell from './TableCell';

function Table(props) {

  const {
    children,
    className,
    extended,
    footerRow,
    footerRows,
    headerRow,
    headerRows,
    metadataTable,
    renderBodyRow,
    sortable,
    tableData
  } = props;

  const classes = cx(
    className,
    classByKey(extended, 'extended'),
    classByKey(metadataTable, 'metadata'),
    classByKey(sortable, 'sortable'),
    'table'
  );

  const rest = getUnhandledProps(Table, props);
  const ElementType = getElementType(Table, props);


  /**
   * If Children are defined and valid
   * render the Table using the children node
   */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }


  /** Compute the Table Headers */
  const hasHeaderRows = headerRow || headerRows;
  const headerShorthandOptions = { defaultProps: { cellAs: 'th' }, autoGenerateKey: true };
  const headerElement = hasHeaderRows && (
    <TableHeader>
      {headerRow && TableRow.create(headerRow, headerShorthandOptions)}
      {headerRows
        && _.map(headerRows, headerRowData => TableRow
          .create(headerRowData, headerShorthandOptions))}
    </TableHeader>
  );

  const hasFooterRows = footerRow || footerRows;
  const footerElement = hasFooterRows && (
    <TableFooter>
      {footerRow && TableRow.create(footerRow, { autoGenerateKey: true })}
      {footerRows
        && _.map(footerRows, footerRowData => TableRow
          .create(footerRowData, { autoGenerateKey: true }))}
    </TableFooter>
  );

  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
      <TableBody>
        {renderBodyRow
          && _.map(tableData, (data, index) => TableRow.create(
            renderBodyRow(data, index), { autoGenerateKey: true }
          ))}
      </TableBody>
      {footerElement}
    </ElementType>
  );

}

Table.propTypes = {
  /** An Element used to Render the Component */
  as: PropTypes.elementType,

  /** Children Node */
  children: PropTypes.node,

  /** User defined Classname */
  className: PropTypes.string,

  /** An extended table will remove left and right padding on boundary cells */
  extended: PropTypes.bool,

  /** Footer Row Data */
  footerRow: PropTypes.array,

  /** Footer Multi Rows Data */
  footerRows: PropTypes.arrayOf(PropTypes.array),

  /** Header Row Data */
  headerRow: PropTypes.array,

  /** Header Multi Rows Data */
  headerRows: PropTypes.arrayOf(PropTypes.array),

  /** Add the special metadata style */
  metadataTable: PropTypes.bool,

  /** Render Function */
  renderBodyRow: PropTypes.func,

  /** Set Table as Sortable */
  sortable: PropTypes.bool,

  /** Table Array Data */
  tableData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

Table.defaultProps = {
  as: 'table'
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;

export default Table;
