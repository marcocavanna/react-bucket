import * as React from 'react'

export interface ItemContentProps extends StrictItemContentProps {
  [key: string]: any
}

export interface StrictItemContentProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content shorthand */
  content?: React.ReactNode,

  /** Header Shorthand */
  header?: string,

  /** Truncated Content */
  notTruncated?: boolean
}

interface ItemContentComponent extends React.StatelessComponent<ItemContentProps> { }

declare const ItemContent: ItemContentComponent

export default ItemContent
