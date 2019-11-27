import * as React from 'react'

import { ReactBucketICON } from '../../generic'

export interface ItemHeaderProps extends StrictItemHeaderProps {
  [key: string]: any
}

export interface StrictItemHeaderProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Icon Shorthand */
  icon?: ReactBucketICON

}

interface ItemHeaderComponent extends React.StatelessComponent<ItemHeaderProps> { }

declare const ItemHeader: ItemHeaderComponent

export default ItemHeader
