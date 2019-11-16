import * as React from 'react'

import { StrictItemToolProps } from './ItemTool';

export interface ItemToolsProps extends StrictItemToolsProps {
  [key: string]: any
}

export interface StrictItemToolsProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Tools Shorthand */
  tools?: StrictItemToolProps[]
}

interface ItemToolsComponent extends React.StatelessComponent<ItemToolsProps> { }

declare const ItemTools: ItemToolsComponent

export default ItemTools