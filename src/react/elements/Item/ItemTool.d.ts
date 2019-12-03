import * as React from 'react'

import { ButtonProps } from '../Button';

export interface ItemToolProps extends StrictItemToolProps {
  [key: string]: any
}

export interface StrictItemToolProps extends ButtonProps {
  /** Set the Tool tooltip text */
  tooltip?: string
}

declare const ItemTool: React.FunctionComponent<ItemToolProps>

export default ItemTool
