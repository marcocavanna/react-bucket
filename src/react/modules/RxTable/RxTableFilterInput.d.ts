import * as React from 'react'

export interface RxTableFilterInputProps extends StrictRxTableFilterInputProps {
  [key: string]: any
}

export interface StrictRxTableFilterInputProps {
  /** Enable boolean indicate wethever render the component */
  enalbed?: boolean

  /** On Filter Change Handler Function */
  onFilterChange: (newFilter: string) => void
}

interface RxTableFilterInputComponent extends React.StatelessComponent<RxTableFilterInputProps> { }

declare const RxTableFilterInput: RxTableFilterInputComponent

export default RxTableFilterInput
