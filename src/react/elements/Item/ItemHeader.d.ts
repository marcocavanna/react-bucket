import * as React from 'react'

import { ReactBucketICON } from '../../generic'

export interface ItemHeaderProps extends StrictItemHeaderProps {
  [key: string]: any
}

export interface StrictItemHeaderProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Icon Shorthand */
  icon?: ReactBucketICON

}

declare const ItemHeader: React.FunctionComponent<ItemHeaderProps>

export default ItemHeader