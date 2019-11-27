import * as React from 'react'

import ItemAvatar, { StrictItemAvatarProps } from './ItemAvatar';
import ItemHeader from './ItemHeader';
import ItemContent from './ItemContent';
import ItemGroup from './ItemGroup';
import ItemTools from './ItemTools';
import ItemTool, { StrictItemToolProps } from './ItemTool';

export interface ItemProps extends StrictItemProps {
  [key: string]: any
}

export interface StrictItemProps {
  /** Active State */
  active?: boolean | 'primary' | 'secondary' | 'success' | 'danger' | 'warning'

  /** An element used to render */
  as?: any

  /** Avatar Properties Shorthand */
  avatar?: StrictItemAvatarProps

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content shorthand */
  content?: React.ReactNode

  /** Disabled State */
  disabled?: boolean

  /** Header Shorthand */
  header?: string

  /** OnClick Function */
  onClick?: Function

  /** Tools shorthand */
  tools?: StrictItemToolProps[]

}

interface ItemComponent extends React.StatelessComponent<ItemProps> {
  Avatar?: typeof ItemAvatar
  Header?: typeof ItemHeader
  Content?: typeof ItemContent
  Group?: typeof ItemGroup
  Tools?: typeof ItemTools
  Tool: typeof ItemTool
}

declare const Item: ItemComponent

export default Item
