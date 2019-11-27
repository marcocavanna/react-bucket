import * as React from 'react'

export interface ToastHeaderProps extends StrictToastHeaderProps {
  [key: string]: any
}

export interface StrictToastHeaderProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

}

declare const ToastHeader: React.FunctionComponent<ToastHeaderProps>

export default ToastHeader
