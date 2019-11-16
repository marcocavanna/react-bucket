import * as React from 'react'

export interface ModalContentProps extends StrictModalContentProps {
  [key: string]: any
}

export interface StrictModalContentProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: React.ReactNode
}

interface ModalContentComponent extends React.StatelessComponent<ModalContentProps> { }

declare const ModalContent: ModalContentComponent

export default ModalContent
