import * as React from 'react'

export interface ModalHeaderProps extends StrictModalHeaderProps {
  [key: string]: any
}

export interface StrictModalHeaderProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode
}

interface ModalHeaderComponent extends React.StatelessComponent<ModalHeaderProps> { }

declare const ModalHeader: ModalHeaderComponent

export default ModalHeader
