import * as React from 'react'

export interface DropdownMenuProps extends StrictDropdownMenuProps {
  [key: string]: any
}

export interface StrictDropdownMenuProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: React.ReactNode,

  /** Event Stack name */
  eventStack: string,

  /** Items Shorthand */
  items: React.ReactElement[],

  /** On Menu Close Handler */
  onClose: (e: React.SyntheticEvent, props: StrictDropdownMenuProps) => void,

  /** On Menu Open Handler */
  onOpen: (e: React.SyntheticEvent, props: StrictDropdownMenuProps) => void,

  /** Trigger Element */
  trigger: React.ReactElement

}

interface DropdownMenuComponent extends React.StatelessComponent<DropdownMenuProps> { }

declare const DropdownMenu: DropdownMenuComponent

export default DropdownMenu
