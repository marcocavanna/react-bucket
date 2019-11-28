import * as React from 'react'

export interface SpacerProps extends StrictSpacerProps {
  [key: string]: any
}

export interface StrictSpacerProps {
  /** An element used to render */
  as?: React.ElementType

  /** User defined class */
  className?: string

  /** Spacer Height */
  height?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
}

declare const Spacer: React.FunctionComponent<SpacerProps>

export default Spacer
