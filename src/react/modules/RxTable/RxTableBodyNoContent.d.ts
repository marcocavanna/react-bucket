import * as React from 'react'

export interface RxTableBodyNoContentProps extends StrictRxTableBodyNoContentProps {
  [key: string]: any
}

export interface StrictRxTableBodyNoContentProps {
  /** Columns Count */
  columnsCount?: number

  /** Content Shorthand */
  content?: React.ReactNode
}

declare const RxTableBodyNoContent: React.FunctionComponent<RxTableBodyNoContentProps>

export default RxTableBodyNoContent
