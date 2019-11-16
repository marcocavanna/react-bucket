import * as React from 'react'

export interface MenuHeaderProps extends StrictMenuHeaderProps {
  [key: string]: any
}

export interface StrictMenuHeaderProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: string
}

interface MenuHeaderComponent extends React.StatelessComponent<MenuHeaderProps> { }

declare const MenuHeader: MenuHeaderComponent

export default MenuHeader