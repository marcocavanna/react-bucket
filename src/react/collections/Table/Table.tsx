import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  ShorthandCollection
} from '../../generic';

import {
  useElementType
} from '../../lib';

import { TableProps } from './Table.types';
import { TableCellProps } from './TableCell.types';

import TableBody from './TableBody';
import TableCell from './TableCell';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';


export default function Table<Data = any>(props: TableProps<Data>): React.ReactElement<TableProps<Data>> {

  const {
    as,
    children,
    className,
    compressed,
    content,
    responsive,
    rows,
    sortable,
    tableData,
    ...rest
  } = props;

  // @ts-ignore
  const ElementType = useElementType<TableProps<Data>>(Table, props);

  const classes = clsx(
    {
      compressed,
      sortable
    },
    'table',
    className
  );


  // ----
  // Build Table Header
  // ----
  const headerRows = rows?.header && (
    rows.header.map((row) => (
      TableRow.create(row, { autoGenerateKey: true, defaultProps: { cellAs: TableHeaderCell } })
    ))
  );


  // ----
  // Build Table Footer
  // ----
  const footerRows = rows?.footer && (
    rows.footer.map((row) => (
      TableRow.create(row, { autoGenerateKey: true, defaultProps: { cellAs: TableCell } })
    ))
  );


  if (!childrenUtils.isNil(children)) {
    const tableElementWithChildren = (
      <ElementType {...rest} className={classes}>
        {!!headerRows && <TableHeader content={headerRows} />}
        {children}
        {!!footerRows && <TableFooter content={footerRows} />}
      </ElementType>
    );

    return responsive
      ? <div className={'responsive-table'}>{tableElementWithChildren}</div>
      : tableElementWithChildren;
  }


  // ----
  // Build Table Body
  // ----
  const bodyRows = rows?.body && Array.isArray(tableData) && (
    typeof rows.body === 'function'
      ? tableData
      // Generate Row Cells for Each Item
      .map((data, index, array) => (
        TableRow.create(
          (rows.body as (
              (data: Data, index: number, array: Data[]) => ShorthandCollection<TableCellProps>)
          )(data, index, array), { autoGenerateKey: true, defaultProps: { cellAs: TableCell } })
      ))
      : rows.body.map((row) => (
        TableRow.create(row, { autoGenerateKey: true, defaultProps: { cellAs: TableCell } })
      ))
  );

  const tableElement = (
    <ElementType {...rest} className={classes}>
      {!!headerRows && <TableHeader content={headerRows} />}
      {!!bodyRows && <TableBody content={bodyRows} />}
      {!!footerRows && <TableFooter content={footerRows} />}
    </ElementType>
  );

  return responsive
    ? <div className={'responsive-table'}>{tableElement}</div>
    : tableElement;

}

Table.displayName = 'Table';

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.Row = TableRow;

Table.defaultProps = {
  as: 'table'
} as Partial<TableProps>;
