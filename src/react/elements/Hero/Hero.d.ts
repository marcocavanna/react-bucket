import * as React from 'react'

import { ReactBucketICON } from '../../generic';

import { ButtonProps } from '../Button';

import HeroHeader from './HeroHeader';
import HeroContent from './HeroContent';
import HeroTools from './HeroTools';

export interface HeroProps extends StrictHeroProps {
  [key: string]: any
}

export interface StrictHeroProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Header shorthand */
  header?: React.ReactNode

  /** Hero Icon to Show */
  heroIcon?: ReactBucketICON

  /** Array of Tools */
  tools?: ButtonProps[]
}

interface HeroComponent extends React.StatelessComponent<HeroProps> {
  Header: typeof HeroHeader
  Content: typeof HeroContent
  Tools: typeof HeroTools
}

declare const Hero: HeroComponent

export default Hero
