import * as React from 'react'

import { ReactBucketShorthandCollection } from '../../generic';

import TableBody from './TableBody';
import TableCell, { TableCellProps } from './TableCell';
import TableFooter, { TableFooterProps } from './TableFooter';
import TableHeader, { TableHeaderProps } from './TableHeader';
import TableHeaderCell, { TableHeaderCellProps } from './TableHeaderCell';
import TableRow from './TableRow';

export interface TableProps<T> extends StrictTableProps<T> {
  [key: string]: any
}

export interface StrictTableProps<T extends any> {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Compress Cell Padding */
  compressed?: boolean

  /** Extend the table, removing boundary cells padding */
  extended?: boolean

  /** Shorthand for footer Row */
  footerRow?: ReactBucketShorthandCollection<TableCellProps>

  /** Shorthand for multiple footer row */
  footerRows?: ReactBucketShorthandCollection<TableFooterProps>

  /** Shorthand for Header Row */
  headerRow?: ReactBucketShorthandCollection<TableHeaderCellProps>

  /** Shorthand for multiple Header Row */
  headerRows?: ReactBucketShorthandCollection<TableHeaderProps>

  /** Set the Metadata Table */
  metadataTable?: boolean

  /** Render row function, iterate over tableData array */
  renderBodyRow?: (data: T, index: number) => React.ReactNode | ReactBucketShorthandCollection<TableCellProps>

  /** Set Sortable Behaviour */
  sortable?: boolean

  /** Array of items */
  tableData?: T[],

  /** Remove row border */
  withoutBorder?: boolean
}

interface TableComponent extends React.StatelessComponent<TableProps<T>> {
  Body: typeof TableBody
  Cell: typeof TableCell
  Footer: typeof TableFooter
  Header: typeof TableHeader
  HeaderCell: typeof TableHeaderCell
  Row: typeof TableRow
}

declare const Table: TableComponent

export default Table
