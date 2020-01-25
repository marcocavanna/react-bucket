import * as React from 'react'

export interface RxTableBodyNoFilteredProps extends StrictRxTableBodyNoFilteredProps {
  [key: string]: any
}

export interface StrictRxTableBodyNoFilteredProps {
  /** Columns Count */
  columnsCount?: number

  /** Content Shorthand */
  content?: React.ReactNode | ((search: string) => React.ReactNode)

  /** Filtered Text */
  filteredText?: string
}

declare const RxTableBodyNoFiltered: React.FunctionComponent<RxTableBodyNoFilteredProps>

export default RxTableBodyNoFiltered
