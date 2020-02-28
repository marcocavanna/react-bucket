import * as React from 'react'

export interface InputGroupProps extends StrictInputGroupProps {
  [key: string]: any
}

export interface StrictInputGroupProps {
  /** An element used to render */
  as?: React.ElementType,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: React.ReactNode
}

interface InputGroupComponent extends React.StatelessComponent<InputGroupProps> { }

declare const InputGroup: InputGroupComponent

export default InputGroup
