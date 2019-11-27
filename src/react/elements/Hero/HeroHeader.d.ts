import * as React from 'react'

import { ReactBucketICON } from '../../generic';

export interface HeroHeaderProps extends StrictHeroHeaderProps {
  [key: string]: any
}

export interface StrictHeroHeaderProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content shorthand */
  content?: React.ReactNode,

  /** Icon element */
  icon?: ReactBucketICON

}

interface HeroHeaderComponent extends React.StatelessComponent<HeroHeaderProps> { }

declare const HeroHeader: HeroHeaderComponent

export default HeroHeader
