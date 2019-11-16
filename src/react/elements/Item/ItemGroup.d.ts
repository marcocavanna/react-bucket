import * as React from 'react'

import { StrictItemProps } from './Item';

export interface ItemGroupProps extends StrictItemGroupProps {
  [key: string]: any
}

export interface StrictItemGroupProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Set Item as Clickable */
  clickableItems?: boolean,

  /** Divided */
  divided?: boolean

  /** Items Shorthand */
  items?: StrictItemProps[]
}

interface ItemGroupComponent extends React.StatelessComponent<ItemGroupProps> { }

declare const ItemGroup: ItemGroupComponent

export default ItemGroup