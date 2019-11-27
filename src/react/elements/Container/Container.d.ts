import * as React from 'react'

import { ReactBucketCOLORS, ReactBucketBREAKPOINTS, ReactBucketALIGN } from '../../generic';

declare type DPELEVATION = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24'

declare type MARGINPADDING = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export interface ContainerProps extends StrictContainerProps {
  [key: string]: any
}

export interface StrictContainerProps {
  /** An element used to render */
  as?: any

  /** Container Background Color */
  background?: ReactBucketCOLORS

  /** Display container as Block */
  block?: boolean | ReactBucketBREAKPOINTS

  /** Display Border Bottom */
  borderedBottom?: boolean | ReactBucketBREAKPOINTS

  /** Display Border Left */
  borderedLeft?: boolean | ReactBucketBREAKPOINTS

  /** Display Border Right */
  borderedRight?: boolean | ReactBucketBREAKPOINTS

  /** Display Border Top */
  borderedTop?: boolean | ReactBucketBREAKPOINTS

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Box Shadow */
  dpElevation?: DPELEVATION

  /** Display container as Flex */
  flex?: boolean | ReactBucketBREAKPOINTS

  /** Change container font size */
  fontSize?: 'small' | 'normal' | 'large'

  /** Change container font weight */
  fontWeight?: 'light' | 'regular' | 'semi-bold' | 'bold'

  /** Hide the container */
  hidden?: boolean | ReactBucketBREAKPOINTS

  /** Display container as Inline */
  inline?: boolean | ReactBucketBREAKPOINTS

  /** Display container as Inline Block */
  inlineBlock?: boolean | ReactBucketBREAKPOINTS

  /** Set container Margin */
  margin?: MARGINPADDING

  /** Set container Margin Bottom */
  marginBottom?: MARGINPADDING

  /** Set container Margin Left */
  marginLeft?: MARGINPADDING

  /** Set container Margin Right */
  marginRight?: MARGINPADDING

  /** Set container Margin Top */
  marginTop?: MARGINPADDING

  /** Set container Margin X */
  marginX?: MARGINPADDING

  /** Set container Margin Y */
  marginY?: MARGINPADDING

  /** Set container Padding */
  padding?: MARGINPADDING

  /** Set container Padding Bottom */
  paddingBottom?: MARGINPADDING

  /** Set container Padding Left */
  paddingLeft?: MARGINPADDING

  /** Set container Padding Right */
  paddingRight?: MARGINPADDING

  /** Set container Padding Top */
  paddingTop?: MARGINPADDING

  /** Set container Padding X */
  paddingX?: MARGINPADDING

  /** Set container Padding Y */
  paddingY?: MARGINPADDING

  /** Set Text Align */
  textAlign?: ReactBucketALIGN | 'justify'

  /** Set Text Color */
  textColor?: ReactBucketCOLORS

  /** Set Text Transform */
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase'

  /** Set container as Visible */
  visible: boolean | ReactBucketBREAKPOINTS

}

interface ContainerComponent extends React.StatelessComponent<ContainerProps> { }
/** In case of subcomponent append Name: typeof ImportedComponent in the interface */

declare const Container: ContainerComponent

export default Container
