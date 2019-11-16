import * as React from 'react'

import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon'

export interface ItemHeaderProps extends StrictItemHeaderProps {
  [key: string]: any
}

export interface StrictItemHeaderProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: any,

  /** Icon Shorthand */
  icon?: AppBucketsICON

}

interface ItemHeaderComponent extends React.StatelessComponent<ItemHeaderProps> { }

declare const ItemHeader: ItemHeaderComponent

export default ItemHeader