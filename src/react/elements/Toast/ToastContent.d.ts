import * as React from 'react'

export interface ToastContentProps extends StrictToastContentProps {
  [key: string]: any
}

export interface StrictToastContentProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode
}

declare const ToastContent: React.FunctionComponent<ToastContentProps>

export default ToastContent
