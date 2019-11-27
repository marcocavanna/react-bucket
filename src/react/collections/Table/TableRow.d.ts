import * as React from 'react'

export interface TableRowProps extends StrictTableRowProps {
  [key: string]: any
}

export interface StrictTableRowProps {
  /** Set Row as Active */
  active: boolean,

  /** An element used to render the content */
  as: any,

  /** Set the element used to Render the Cells */
  cellAs: any,

  /** Array of string used to render the cells */
  cells: string[],

  /** Children props */
  children?: React.ReactNode,

  /** User defined Classes */
  className: string,

  /** Set Row as Disabled */
  disabled: boolean,

  /** Set Row as Error */
  error: boolean,

  /** Set a Row as Selectable */
  selectable: boolean,

  /** Set Row as Success */
  success: boolean,

  /** Set Row as Warning */
  warning: boolean
}

interface TableRowComponent extends React.StatelessComponent<TableRowProps> { }

declare const TableRow: TableRowComponent

export default TableRow
