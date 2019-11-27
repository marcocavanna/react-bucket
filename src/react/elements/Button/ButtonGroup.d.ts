import * as React from 'react'

export interface ButtonGroupProps extends StrictButtonGroupProps {
  [key: string]: any
}

export interface StrictButtonGroupProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Full Width button Group */
  full?: boolean

  /** Set Vertical Display */
  vertical?: boolean

}

interface ButtonGroupComponent extends React.StatelessComponent<ButtonGroupProps> { }

declare const ButtonGroup: ButtonGroupComponent

export default ButtonGroup
