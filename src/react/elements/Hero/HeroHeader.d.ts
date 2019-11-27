import * as React from 'react'

import { ReactBucketICON } from '../../generic';

export interface HeroHeaderProps extends StrictHeroHeaderProps {
  [key: string]: any
}

export interface StrictHeroHeaderProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content shorthand */
  content?: React.ReactNode

  /** Icon element */
  icon?: ReactBucketICON

}

declare const HeroHeader: React.FunctionComponent<HeroHeaderProps>

export default HeroHeader
