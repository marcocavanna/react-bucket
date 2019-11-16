import * as React from 'react'

import { StrictTableCellProps } from './TableCell';

export interface TableHeaderCellProps extends StrictTableHeaderCellProps {
  [key: string]: any
}

export interface StrictTableHeaderCellProps extends StrictTableCellProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  className?: string,

  /** User defined class */
  sorted?: 'asc' | 'desc',

  /** A cell header can be unsortable, hiding sortin control */
  unsortable?: boolean

}

interface TableHeaderCellComponent extends React.StatelessComponent<TableHeaderCellProps> { }

declare const TableHeaderCell: TableHeaderCellComponent

export default TableHeaderCell
