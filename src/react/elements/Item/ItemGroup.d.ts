import * as React from 'react'

import { ReactBucketShorthandCollection } from '../../generic'

import { ItemProps } from './Item';

export interface ItemGroupProps extends StrictItemGroupProps {
  [key: string]: any
}

export interface StrictItemGroupProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Set Item as Clickable */
  clickableItems?: boolean

  /** Divided */
  divided?: boolean

  /** Items Shorthand */
  items?: ReactBucketShorthandCollection<ItemProps>
}

declare const ItemGroup: React.FunctionComponent<ItemGroupProps>

export default ItemGroup
