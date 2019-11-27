import * as React from 'react'

import { StrictButtonProps } from '../Button';

export interface ItemToolProps extends StrictItemToolProps {
  [key: string]: any
}

export interface StrictItemToolProps extends StrictButtonProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

}

interface ItemToolComponent extends React.StatelessComponent<ItemToolProps> { }

declare const ItemTool: ItemToolComponent

export default ItemTool
