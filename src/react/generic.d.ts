import * as React from 'react'

export { ReactBucketICON } from '../fontawesome/icon-module/fa-icon';

/**
 * Alignment
 */
export type ReactBucketALIGN = 'left' | 'center' | 'right'
export type ReactBucketFONTWEIGHT = 'light' | 'regular' | 'semi-bold' | 'bold'
export type ReactBucketVERTICALALIGN = 'on top' | 'center' | 'on bottom'
export type ReactBucketFLEXVERTICALALIGN = ReactBucketVERTICALALIGN | 'stretched'
export type ReactBucketFLEXHORIZONTALALIGN = 'on start' | 'centered' | 'on end' | 'spaced between' | 'spaced around'

/**
 * Responsive
 */
export type ReactBucketRESPONSIVE = 'phone' | 'tablet' | 'desktop' | 'large-desktop'
export type ReactBucketBREAKPOINTS = 'on phone' | 'on tablet' | 'on desktop' | 'on large desktop'

/**
 * Width
 */
export type ReactBucketCOLUMNWIDTH = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
export type ReactBucketCOLUMNOFFSET = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11'

/**
 * Content Short Hand
 */
export type ReactBucketShorthandItemFunc<TProps> = (
  component?: React.ReactType<TProps>,
  props?: TProps,
  children?: React.ReactNode
) => React.ReactElement<any> | null

export type ReactBucketShorthandCollection<TProps> = ReactBucketShorthandItem<TProps>[]
export type ReactBucketShorthandContent = React.ReactNode
export type ReactBucketShorthandItem<TProps> =
  | React.ReactNode
  | TProps
  | ReactBucketShorthandItemFunc<TProps>

/**
 * Size
 */
export type ReactBucketSIZE = 'extra-small' | 'small' | 'normal' | 'large' | 'big' | 'huge'

/**
 * Colors
 */
export type ReactBucketBRANDCOLOR =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'

export type ReactBucketUICOLOR =
  | 'text'
  | 'text-tint'
  | 'text-shade'
  | 'black'
  | 'black-tint'
  | 'white'
  | 'white-shade'
  | 'blue'
  | 'teal'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'pink'
  | 'purple'
  | 'grey-lightest'
  | 'grey-light'
  | 'grey'
  | 'grey-dark'
  | 'grey-darkest'

export type ReactBucketSOCIALCOLOR =
  | 'facebook'
  | 'twitter'
  | 'youtube'
  | 'instagram'
  | 'pinterest'
  | 'linkedin'
  | 'google'
  | 'google-plus'
  | 'whatsapp'
  | 'tumblr'
  | 'apple'
  | 'amazon'
  | 'microsoft'
  | 'vimeo'
  | 'skype'
  | 'android'
  | 'dribble'
  | 'slack'
  | 'yahoo'
  | 'telegram'

export type ReactBucketCOLORS = ReactBucketBRANDCOLOR | ReactBucketUICOLOR | ReactBucketSOCIALCOLOR
