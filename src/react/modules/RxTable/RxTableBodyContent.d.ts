import * as React from 'react'

import { IRxTableDataColumn } from './RxTableData';

export interface RxTableBodyContentProps extends StrictRxTableBodyContentProps {
  [key: string]: any
}

export interface StrictRxTableBodyContentProps {
  /** Function to build Row */
  children: (item: object, index: number, arr: object[]) => React.ReactNode,

  /** Columns Array */
  columns: IRxTableDataColumn[]

  /** Data Array */
  data: object[],

  /** Key Field to use */
  keyField: string,

  /** Handler on Row Click */
  onRowClick: (item: object, index: number, arr: object[]) => React.ReactNode,

  /** Function to calc if a row has tool */
  rowHasTools: (item: object) => boolean,

  /** Tools to use */
  tools: () => object[],

  /** Tools column position */
  toolsPosition: 'left' | 'right'
}

declare const RxTableBodyContent: React.FunctionComponent<RxTableBodyContentProps>

export default RxTableBodyContent
