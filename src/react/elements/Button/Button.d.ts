import * as React from 'react'

import {
  AppBucketsCOLORS,
  AppBucketsSIZE,
  ReactBucketICON
} from '../../generic';

import ButtonGroup from './ButtonGroup';

export interface ButtonProps extends StrictButtonProps {
  [key: string]: any
}

export interface StrictButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** Circle Button */
  circle?: boolean

  /** Button Background Color */
  color?: AppBucketsCOLORS

  /** Button Content Property */
  content?: React.ReactNode

  /** Danger Color */
  danger?: boolean

  /** Disabled State */
  disabled?: boolean

  /** Display Button as Flat */
  flat?: boolean

  /** Icon Property or Definition */
  icon?: boolean | ReactBucketICON

  /** Info Color */
  info?: boolean

  /** Generate Button as Fab */
  fab?: boolean

  /** Set fullwidth Button */
  full?: boolean

  /** Icon Position */
  iconPosition?: 'left' | 'right'

  /** Inverted Color */
  inverted?: boolean

  /** Button with Loader */
  loading?: boolean

  /** Primary Color */
  primary?: boolean

  /** Role Attributes */
  role?: boolean

  /** Render Rounded Button */
  rounded?: boolean

  /** Secondary Color */
  secondary?: boolean

  /** Change Button Size */
  size?: AppBucketsSIZE

  /** Success Color */
  success?: boolean

  /** Tab Index Order */
  tabIndex?: number

  /** Warning Color */
  warning?: boolean

}

declare class Button extends React.Component<ButtonProps, {}> {
  static Group: typeof ButtonGroup
}

export default Button
