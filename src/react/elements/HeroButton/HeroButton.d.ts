import * as React from 'react'

import { ReactBucketICON } from '../../generic';

export interface HeroButtonProps extends StrictHeroButtonProps {
  [key: string]: any
}

export interface StrictHeroButtonProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Disable Button */
  disabled?: boolean

  /** A discreet Hero Button will change only text color */
  discreet?: boolean

  /** Hero Header */
  header?: string

  /** Hero Icon */
  icon?: ReactBucketICON

  /** Color Variation */
  variation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
}

interface HeroButtonComponent extends React.StatelessComponent<HeroButtonProps> { }

declare const HeroButton: HeroButtonComponent

export default HeroButton
