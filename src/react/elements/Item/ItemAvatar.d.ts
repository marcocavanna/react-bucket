import * as React from 'react'

import { ReactBucketCOLOR, ReactBucketSIZE, ReactBucketICON } from '../../generic'

export interface ItemAvatarProps extends StrictItemAvatarProps {
  [key: string]: any
}

export interface StrictItemAvatarProps {
  /** An element used to render */
  as?: React.ElementType

  /** Centered */
  centered?: boolean

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Set Avatar Color */
  color?: ReactBucketCOLOR

  /** Set Avatar Placeholder */
  content?: React.ReactNode

  /** Set Danger Style */
  danger?: boolean

  /** Disabled State */
  disabled?: boolean

  /** Set flexible Avatar Width */
  flexible?: boolean

  /** Set the Random Background color generator */
  generateBackground?: boolean | string

  /** Set Avatar Icon */
  icon?: ReactBucketICON

  /** Set Avatar Image */
  image?: string

  /** Inline Style */
  inline?: boolean

  /** Show Notification Badge */
  notifications?: boolean | React.ReactNode

  /** Set Primary Style */
  primary?: boolean

  /** Set Secondary Style */
  secondary?: boolean

  /** Change Avatar Size */
  size?: ReactBucketSIZE

  /** Set square Avatar */
  square?: boolean

  /** Set Success Style */
  success?: boolean

  /** Set Warning Style */
  warning?: boolean

}

declare const ItemAvatar: React.FunctionComponent<ItemAvatarProps>

export default ItemAvatar