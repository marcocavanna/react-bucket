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

}

interface ToastHeaderComponent extends React.StatelessComponent<ToastHeaderProps> { }

declare const ToastHeader: ToastHeaderComponent

export default ToastHeader
