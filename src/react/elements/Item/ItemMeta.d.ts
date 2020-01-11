import * as React from 'react'

export interface ItemMetaProps extends StrictItemMetaProps {
  [key: string]: any
}

export interface StrictItemMetaProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content shorthand */
  content?: React.ReactNode

  /** Apply a divided border */
  divided?: boolean
}

interface ItemMetaComponent extends React.StatelessComponent<ItemMetaProps> { }

declare const ItemMeta: ItemMetaComponent

export default ItemMeta
