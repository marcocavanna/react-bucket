import * as React from 'react'

import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon';

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
  content?: React.ReactNode

  /** Icon element */
  icon?: AppBucketsICON

}

interface HeroHeaderComponent extends React.StatelessComponent<HeroHeaderProps> { }

declare const HeroHeader: HeroHeaderComponent

export default HeroHeader
