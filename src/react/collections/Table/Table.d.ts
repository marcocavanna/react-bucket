import * as React from 'react'

import TableBody from './TableBody';
import TableCell from './TableCell';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';

export interface TableProps extends StrictTableProps {
  [key: string]: any
}

export interface StrictTableProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Extend the table, removing boundary cells padding */
  extended?: boolean

  /** Set the Metadata Table */
  metadataTable?: boolean

  /** Set Sortable Behaviour */
  sortable?: boolean
}

interface TableComponent extends React.StatelessComponent<TableProps> {
  Body: typeof TableBody
  Cell: typeof TableCell
  Footer: typeof TableFooter
  Header: typeof TableHeader
  HeaderCell: typeof TableHeaderCell
  Row: typeof TableRow
}

declare const Table: TableComponent

export default Table
