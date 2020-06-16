import * as React from 'react'

import { ReactBucketICON, ReactBucketSIZE, ReactBucketALIGN } from '../../generic';

export interface HeroButtonProps extends StrictHeroButtonProps {
  [key: string]: any
}

export interface StrictHeroButtonProps {
  /** Render the Button as Active */
  active?: boolean

  /** An element used to render */
  as?: React.ElementType

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
  header?: React.ReactNode

  /** Hero Icon */
  icon?: ReactBucketICON

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} props - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, props: HeroButtonProps) => void,

  /** Size Variation */
  size?: ReactBucketSIZE

  /** Set the Text Alignment */
  textAlign?: ReactBucketALIGN

  /** Color Variation */
  variation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
}

declare const HeroButton: React.FunctionComponent<HeroButtonProps>

export default HeroButton