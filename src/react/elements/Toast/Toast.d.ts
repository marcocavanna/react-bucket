import * as React from 'react'

import { ReactBucketICON } from '../../generic'

import ToastHeader from './ToastHeader';
import ToastContent from './ToastContent';

export interface ToastProps extends StrictToastProps {
  [key: string]: any
}

export interface StrictToastProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content shorthand */
  content?: any

  /** Set if toast is dismissable, using a string to define icon */
  dismissable?: boolean | ReactBucketICON

  /** Toast with error Style */
  error?: boolean

  /** Header shorthand */
  header?: any

  /** Icon shorthand */
  icon?: ReactBucketICON

  /** Toast with info Style */
  info?: boolean

  /** On Click Handler */
  onClick?: (e: React.SyntheticEvent, props: ToastProps) => void

  /** Toast with primary Style */
  primary?: boolean

  /** Toast with secondary Style */
  secondary?: boolean

  /** Toast with success Style */
  success?: boolean

  /** Toast with warning Style */
  warning?: boolean
}

interface ToastComponent extends React.StatelessComponent<ToastProps> {
  Header: typeof ToastHeader
  Content: typeof ToastContent
}

declare const Toast: ToastComponent

export default Toast
