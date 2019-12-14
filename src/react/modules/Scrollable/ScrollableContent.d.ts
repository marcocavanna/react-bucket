import * as React from 'react'

export interface ScrollableContentProps extends StrictScrollableContentProps {
  [key: string]: any
}

export interface StrictScrollableContentProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Contente Shorthand */
  content?: React.ReactNode
}

interface ScrollableContentComponent extends React.StatelessComponent<ScrollableContentProps> { }

declare const ScrollableContent: ScrollableContentComponent

export default ScrollableContent
