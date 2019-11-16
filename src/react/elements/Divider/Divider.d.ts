import * as React from 'react'

export interface DividerProps extends StrictDividerProps {
  [key: string]: any
}

export interface StrictDividerProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Property */
  content?: string,

  /** Hidden Boolean */
  hidden?: boolean,

  /** Horizontal Divider */
  horizontal?: boolean,

  /** Inverted Colors */
  inverted?: boolean

}

interface DividerComponent extends React.StatelessComponent<DividerProps> { }
/** In case of subcomponent append Name: typeof ImportedComponent in the interface */

declare const Divider: DividerComponent

export default Divider