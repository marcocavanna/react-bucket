import * as React from 'react'

import { ReactBucketShorthandItem, ReactBucketShorthandCollection } from '../../generic';

import ItemAvatar, { ItemAvatarProps } from './ItemAvatar';
import ItemHeader from './ItemHeader';
import ItemContent from './ItemContent';
import ItemGroup from './ItemGroup';
import ItemSection from './ItemSection';
import ItemTools from './ItemTools';
import ItemTool, { ItemToolProps } from './ItemTool';

export interface ItemProps extends StrictItemProps {
  [key: string]: any
}

export interface StrictItemProps {
  /** Active State */
  active?: boolean | 'primary' | 'secondary' | 'success' | 'danger' | 'warning'

  /** An element used to render */
  as?: React.ElementType

  /** Avatar Properties Shorthand */
  avatar?: ReactBucketShorthandItem<ItemAvatarProps>

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

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, props: ItemProps) => void,

  /** Tools shorthand */
  tools?: ReactBucketShorthandCollection<ItemToolProps>

}

interface ItemComponent extends React.FunctionComponent<ItemProps> {
  Avatar: typeof ItemAvatar
  Header: typeof ItemHeader
  Content: typeof ItemContent
  Group: typeof ItemGroup
  Section: typeof ItemSection
  Tools: typeof ItemTools
  Tool: typeof ItemTool
}

declare const Item: ItemComponent

export default Item
