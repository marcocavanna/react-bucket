import * as React from 'react'

export interface HeroContentProps extends StrictHeroContentProps {
  [key: string]: any
}

export interface StrictHeroContentProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode
}

declare const HeroContent: React.FunctionComponent<HeroContentProps>

export default HeroContent
