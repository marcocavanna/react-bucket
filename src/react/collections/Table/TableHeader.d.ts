import * as React from 'react'

export interface TableHeaderProps extends StrictTableHeaderProps {
  [key: string]: any
}

export interface StrictTableHeaderProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shordhand */
  content?: React.ReactNode,

}

interface TableHeaderComponent extends React.StatelessComponent<TableHeaderProps> { }

declare const TableHeader: TableHeaderComponent

export default TableHeader
