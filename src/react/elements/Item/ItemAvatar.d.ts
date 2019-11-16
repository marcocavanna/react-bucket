import * as React from 'react'

import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon'
import { AppBucketsCOLORS, AppBucketsSIZE } from '../../generic'

export interface ItemAvatarProps extends StrictItemAvatarProps {
  [key: string]: any
}

export interface StrictItemAvatarProps {
  /** An element used to render */
  as?: any,

  /** Centered */
  centered?: boolean,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Set Avatar Color */
  color?: AppBucketsCOLORS,

  /** Set Avatar Placeholder */
  content?: string,

  /** Set Danger Style */
  danger?: boolean,

  /** Disabled State */
  disabled?: boolean,

  /** Set the Random Background color generator */
  generateBackground?: boolean | string,

  /** Set Avatar Icon */
  icon?: AppBucketsICON,

  /** Set Avatar Image */
  image?: string,

  /** Inline Style */
  inline?: boolean,

  /** Set Primary Style */
  primary?: boolean,

  /** Set Secondary Style */
  secondary?: boolean,

  /** Change Avatar Size */
  size?: AppBucketsSIZE,

  /** Set Success Style */
  success?: boolean,

  /** Set Warning Style */
  warning?: boolean

}

interface ItemAvatarComponent extends React.StatelessComponent<ItemAvatarProps> { }

declare const ItemAvatar: ItemAvatarComponent

export default ItemAvatar