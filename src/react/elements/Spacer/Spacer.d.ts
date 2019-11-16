import * as React from 'react'

export interface SpacerProps extends StrictSpacerProps {
  [key: string]: any
}

export interface StrictSpacerProps {
  /** An element used to render */
  as?: any,

  /** User defined class */
  className?: string,

  /** Spacer Height */
  height?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
}

interface SpacerComponent extends React.StatelessComponent<SpacerProps> { }
/** In case of subcomponent append Name: typeof ImportedComponent in the interface */

declare const Spacer: SpacerComponent

export default Spacer