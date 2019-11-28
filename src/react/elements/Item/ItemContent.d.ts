import * as React from 'react'

import { ReactBucketShorthandItem } from '../../generic';

import { ItemHeaderProps } from './ItemHeader';

export interface ItemContentProps extends StrictItemContentProps {
  [key: string]: any
}

export interface StrictItemContentProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content shorthand */
  content?: React.ReactNode

  /** Header Shorthand */
  header?: ReactBucketShorthandItem<ItemHeaderProps>

  /** Truncated Content */
  notTruncated?: boolean
}

declare const ItemContent: React.FunctionComponent<ItemContentProps>

export default ItemContent
