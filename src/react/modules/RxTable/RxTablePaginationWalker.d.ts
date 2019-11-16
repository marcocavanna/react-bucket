import * as React from 'react'

export interface RxTablePaginationWalkerProps extends StrictRxTablePaginationWalkerProps {
  [key: string]: any
}

export interface StrictRxTablePaginationWalkerProps {
  /** Current Page */
  currentPage?: number

  /** On Page Change handler function */
  onPageChange?: (page: number) => void

  /** Total Pages */
  totalPages?: number

  /** Walker Size - Number of button to show */
  walkerSize?: number
}

interface RxTablePaginationWalkerComponent extends React.StatelessComponent<RxTablePaginationWalkerProps> { }

declare const RxTablePaginationWalker: RxTablePaginationWalkerComponent

export default RxTablePaginationWalker
