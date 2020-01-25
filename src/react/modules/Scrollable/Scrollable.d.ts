import * as React from 'react'

import ScrollableContent from './ScrollableContent';

export interface ScrollableProps extends StrictScrollableProps {
  [key: string]: any
}

export interface StrictScrollableProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: React.ReactNode

  /** Height Property */
  height?: number
}

interface ScrollableComponent extends React.Component<ScrollableProps, {}> {
  Content: typeof ScrollableContent
}

declare const Scrollable: ScrollableComponent

export default Scrollable
