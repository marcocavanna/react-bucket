import * as React from 'react'

import { ReactBucketCOLOR, ReactBucketICON } from '../../generic';

export interface MenuHeaderProps extends StrictMenuHeaderProps {
  [key: string]: any
}

export interface StrictMenuHeaderProps {
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

declare class MenuHeader extends React.Component<MenuHeaderProps, {}> { }

export default MenuHeader
