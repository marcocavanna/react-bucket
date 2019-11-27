import * as React from 'react'

import { AppBucketsCOLORS } from '../../generic'

import MenuItem from './MenuItem';

export interface MenuProps extends StrictMenuProps {
  [key: string]: any
}

export interface StrictMenuProps {
  /** An element used to render */
  as?: any

  /** Index of the current active menu item */
  activeIndex?: number | string

  /** Menu can have no border */
  borderless?: boolean

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Inital Active Index value */
  defaultActiveIndex?: number | string

  /** Item Shorthand */
  items?: any

  /** On Item Click Handler to be used without children */
  onItemClick?: Function

  /** A menu can have secondary style */
  secondary?: boolean

  /** Tab Style */
  tab?: boolean

  /** Render as Text Only */
  text?: boolean

  /** Vertical Menu */
  vertical?: boolean

}

declare class Menu extends React.Component<MenuProps, {}> {
  static Item: typeof MenuItem
}

export default Menu
