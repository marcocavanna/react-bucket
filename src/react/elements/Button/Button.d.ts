import * as React from 'react'

import {
  ReactBucketCOLOR,
  ReactBucketSIZE,
  ReactBucketICON
} from '../../generic';

import ButtonGroup from './ButtonGroup';

export interface ButtonProps extends StrictButtonProps {
  [key: string]: any
}

export interface StrictButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** Circle Button */
  circle?: boolean

  /** Button Background Color */
  color?: ReactBucketCOLOR

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

  /**
   * Called after user's click
   * @param {React.SyntheticEvent} event The React Click event
   * @param {object} props Button Props
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, props: ButtonProps) => void

  /** Primary Color */
  primary?: boolean

  /** Role Attributes */
  role?: boolean

  /** Render Rounded Button */
  rounded?: boolean

  /** Secondary Color */
  secondary?: boolean

  /** Change Button Size */
  size?: ReactBucketSIZE

  /** Success Color */
  success?: boolean

  /** Tab Index Order */
  tabIndex?: number

  /** Tooltip Text Content */
  tooltip?: string

  /** Warning Color */
  warning?: boolean

}

declare class Button extends React.Component<ButtonProps, {}> {
  static Group: typeof ButtonGroup
}

export default Button
