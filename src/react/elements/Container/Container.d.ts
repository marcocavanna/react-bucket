import * as React from 'react'

import { ReactBucketCOLOR, ReactBucketBREAKPOINT, ReactBucketALIGN } from '../../generic';

declare type DPELEVATION = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24'

declare type MARGINPADDING = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export interface ContainerProps extends StrictContainerProps {
  [key: string]: any
}

export interface StrictContainerProps {
  /** An element used to render */
  as?: React.ElementType

  /** Container Background Color */
  background?: ReactBucketCOLOR

  /** Display container as Block */
  block?: boolean | ReactBucketBREAKPOINT

  /** Display Border Bottom */
  borderedBottom?: boolean | ReactBucketBREAKPOINT

  /** Display Border Left */
  borderedLeft?: boolean | ReactBucketBREAKPOINT

  /** Display Border Right */
  borderedRight?: boolean | ReactBucketBREAKPOINT

  /** Display Border Top */
  borderedTop?: boolean | ReactBucketBREAKPOINT

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Box Shadow */
  dpElevation?: DPELEVATION

  /** Display container as Flex */
  flex?: boolean | ReactBucketBREAKPOINT

  /** Change container font size */
  fontSize?: 'small' | 'normal' | 'large'

  /** Change container font weight */
  fontWeight?: 'light' | 'regular' | 'semi-bold' | 'bold'

  /** Hide the container */
  hidden?: boolean | ReactBucketBREAKPOINT

  /** Display container as Inline */
  inline?: boolean | ReactBucketBREAKPOINT

  /** Display container as Inline Block */
  inlineBlock?: boolean | ReactBucketBREAKPOINT

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
  textColor?: ReactBucketCOLOR

  /** Set Text Transform */
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase'

  /** Set container as Visible */
  visible: boolean | ReactBucketBREAKPOINT

}

interface ContainerComponent extends React.StatelessComponent<ContainerProps> { }

declare const Container: ContainerComponent

export default Container
