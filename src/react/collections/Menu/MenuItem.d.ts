import * as React from 'react'

import { ReactBucketCOLOR, ReactBucketICON } from '../../generic';

export interface MenuItemProps extends StrictMenuItemProps {
  [key: string]: any
}

export interface StrictMenuItemProps {
  /** Display as Active */
  active?: boolean | ReactBucketCOLOR

  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Custom Color */
  color?: ReactBucketCOLOR

  /** Content ShordHand */
  content?: React.ReactNode

  /** Disabled State */
  disabled?: boolean

  /** Header Style */
  header?: boolean

  /** Icon */
  icon?: boolean | ReactBucketICON

  /** Name Shorthand */
  name?: string

  /** OnClick Handler */
  onClick?: Function

  /** On Right Position */
  right?: boolean

}

declare class MenuItem extends React.Component<MenuItemProps, {}> { }

export default MenuItem
