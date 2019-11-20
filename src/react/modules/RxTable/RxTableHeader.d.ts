import * as React from 'react'

import { IRxTableDataColumn, IRxTableDataSorting } from './RxTableData';

export interface RxTableHeaderProps extends StrictRxTableHeaderProps {
  [key: string]: any
}

export interface StrictRxTableHeaderProps {
  /** RxTableData Columns Prop */
  columns?: IRxTableDataColumn[]

  /** Set if must render the Column Action Tools */
  hasToolsColumn?: boolean

  /** On Sort Change Handler Function */
  onSortChange?: (id: string) => any

  /** RxTableData Sorting */
  sorting?: IRxTableDataSorting

  /** Set the tools column position */
  toolsColumnPosition?: 'left' | 'right'
}

interface RxTableHeaderComponent extends React.StatelessComponent<RxTableHeaderProps> { }

declare const RxTableHeader: RxTableHeaderComponent

export default RxTableHeader
