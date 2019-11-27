import * as React from 'react'

export interface TableBodyProps extends StrictTableBodyProps {
  [key: string]: any
}

export interface StrictTableBodyProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shordhand */
  content?: React.ReactNode

}

interface TableBodyComponent extends React.StatelessComponent<TableBodyProps> { }

declare const TableBody: TableBodyComponent

export default TableBody
