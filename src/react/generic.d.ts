import * as React from 'react'

export { ReactBucketICON } from '../fontawesome/icon-module/fa-icon';

/**
 * Alignment
 */
export type AppBucketsALIGN = 'left' | 'center' | 'right'
export type AppBucketsFONTWEIGHT = 'light' | 'regular' | 'semi-bold' | 'bold'
export type AppBucketsVERTICALALIGN = 'on top' | 'center' | 'on bottom'
export type AppBucketsFLEXVERTICALALIGN = AppBucketsVERTICALALIGN | 'stretched'
export type AppBucketsFLEXHORIZONTALALIGN = 'on start' | 'centered' | 'on end' | 'spaced between' | 'spaced around'

/**
 * Responsive
 */
export type AppBucketsRESPONSIVE = 'phone' | 'tablet' | 'desktop' | 'large-desktop'
export type AppBucketsBREAKPOINTS = 'on phone' | 'on tablet' | 'on desktop' | 'on large desktop'

/**
 * Width
 */
export type AppBucketsCOLUMNWIDTH = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
export type AppBucketsCOLUMNOFFSET = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11'

/**
 * Content Short Hand
 */
export type AppBucketsShorthandItemFunc<TProps> = (
  component: React.ReactType<TProps>,
  props: TProps,
  children?: React.ReactNode | React.ReactNodeArray,
) => React.ReactElement<any> | null

export type AppBucketsShorthandCollection<TProps> = AppBucketsShorthandItem<TProps>[]
export type AppBucketsShorthandContent = React.ReactNode
export type AppBucketsShorthandItem<TProps> =
  | React.ReactNode
  | TProps
  | AppBucketsShorthandItemFunc<TProps>

/**
 * Size
 */
export type AppBucketsSIZE = 'extra-small' | 'small' | 'normal' | 'large' | 'big' | 'huge'

/**
 * Colors
 */
export type AppBucketsBRANDCOLOR =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'

export type AppBucketsUICOLOR =
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

export type AppBucketsSOCIALCOLOR =
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

export type AppBucketsCOLORS = AppBucketsBRANDCOLOR | AppBucketsUICOLOR | AppBucketsSOCIALCOLOR
