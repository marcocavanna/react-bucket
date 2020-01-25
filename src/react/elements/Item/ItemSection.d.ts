import * as React from 'react'

import { ReactBucketICON } from '../../generic'

export interface ItemSectionProps extends StrictItemSectionProps {
  [key: string]: any
}

export interface StrictItemSectionProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: React.ReactNode

  /** Icon Shorthand */
  icon?: ReactBucketICON
}

interface ItemSectionComponent extends React.StatelessComponent<ItemSectionProps> { }

declare const ItemSection: ItemSectionComponent

export default ItemSection
