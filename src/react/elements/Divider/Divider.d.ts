import * as React from 'react'

export interface DividerProps extends StrictDividerProps {
  [key: string]: any
}

export interface StrictDividerProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Property */
  content?: React.ReactNode

  /** Hidden Boolean */
  hidden?: boolean

  /** Horizontal Divider */
  horizontal?: boolean

  /** Inverted Colors */
  inverted?: boolean

}

declare const Divider: React.StatelessComponent<DividerProps>

export default Divider
