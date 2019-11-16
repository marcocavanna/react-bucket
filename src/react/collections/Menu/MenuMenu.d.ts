import * as React from 'react'

export interface MenuMenuProps extends StrictMenuMenuProps {
  [key: string]: any
}

export interface StrictMenuMenuProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: any,

  /** Position on Right */
  right?: boolean
}

interface MenuMenuComponent extends React.StatelessComponent<MenuMenuProps> { }

declare const MenuMenu: MenuMenuComponent

export default MenuMenu