import * as React from 'react'

export interface HeroContentProps extends StrictHeroContentProps {
  [key: string]: any
}

export interface StrictHeroContentProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: React.ReactNode
}

interface HeroContentComponent extends React.StatelessComponent<HeroContentProps> { }

declare const HeroContent: HeroContentComponent

export default HeroContent
