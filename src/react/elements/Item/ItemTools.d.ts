import * as React from 'react'

import { ReactBucketShorthandCollection } from '../../generic';

import { ItemToolProps } from './ItemTool';

export interface ItemToolsProps extends StrictItemToolsProps {
  [key: string]: any
}

export interface StrictItemToolsProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Tools Shorthand */
  tools?: ReactBucketShorthandCollection<ItemToolProps>
}

declare const ItemTools: React.FunctionComponent<ItemToolsProps>

export default ItemTools
