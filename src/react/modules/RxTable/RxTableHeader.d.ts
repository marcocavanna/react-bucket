import * as React from 'react'

import { IRxTableDataColumn, IRxTableDataSorting } from './RxTableData';

export interface RxTableHeaderProps extends StrictRxTableHeaderProps {
  [key: string]: any
}

export interface StrictRxTableHeaderProps {
  /** RxTableData Columns Prop */
  columns: IRxTableDataColumn[]

  /** On Sort Change Handler Function */
  onSortChange: (id: string) => any

  /** RxTableData Sorting */
  sorting: IRxTableDataSorting
}

interface RxTableHeaderComponent extends React.StatelessComponent<RxTableHeaderProps> { }

declare const RxTableHeader: RxTableHeaderComponent

export default RxTableHeader
