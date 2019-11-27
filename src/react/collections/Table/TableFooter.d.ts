import * as React from 'react'

import { StrictTableHeaderProps } from './TableHeader';

export interface TableFooterProps extends StrictTableFooterProps {
  [key: string]: any
}

export interface StrictTableFooterProps extends StrictTableHeaderProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

}

interface TableFooterComponent extends React.StatelessComponent<TableFooterProps> { }

declare const TableFooter: TableFooterComponent

export default TableFooter
