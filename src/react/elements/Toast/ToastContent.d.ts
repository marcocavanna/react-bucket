import * as React from 'react'

export interface ToastContentProps extends StrictToastContentProps {
  [key: string]: any
}

export interface StrictToastContentProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

}

interface ToastContentComponent extends React.StatelessComponent<ToastContentProps> { }

declare const ToastContent: ToastContentComponent

export default ToastContent
