import * as React from 'react'

import { ButtonProps } from '../Button';

export interface ItemToolProps extends StrictItemToolProps {
  [key: string]: any
}

export interface StrictItemToolProps extends ButtonProps { }

declare const ItemTool: React.FunctionComponent<ItemToolProps>

export default ItemTool
