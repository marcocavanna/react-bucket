import * as React from 'react';

import { ReactBucketALIGN, ReactBucketCOLOR, ReactBucketCOLUMNWIDTH, ReactBucketCOLUMNOFFSET, ReactBucketFLEXVERTICALALIGN } from '../../generic'

export interface IColumnWidthProp {
  phoneUp?: ReactBucketCOLUMNWIDTH
  tabletUp?: ReactBucketCOLUMNWIDTH
  desktopUp?: ReactBucketCOLUMNWIDTH
  largeDesktopUp?: ReactBucketCOLUMNWIDTH
}

export interface IColumnOffsetProp {
  phoneUp?: ReactBucketCOLUMNOFFSET
  tabletUp?: ReactBucketCOLUMNOFFSET
  desktopUp?: ReactBucketCOLUMNOFFSET
  largeDesktopUp?: ReactBucketCOLUMNOFFSET
}

export interface ColumnProps extends StrictColumnProps {
  [key: string]: any
}

export interface StrictColumnProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Custom Font Color */
  color?: ReactBucketCOLOR

  /** Content Shorthand */
  content?: React.ReactNode

  /** Base Column Width */
  is?: ReactBucketCOLUMNWIDTH | IColumnWidthProp

  /** Responsive Columns Width */
  onTabletIs?       : ReactBucketCOLUMNWIDTH,
  onDesktopIs?      : ReactBucketCOLUMNWIDTH,
  onLargeDesktopIs? : ReactBucketCOLUMNWIDTH,

  /** Base Column Offset */
  offsettedBy?: ReactBucketCOLUMNOFFSET | IColumnOffsetProp

  /** Responsive Column Offset */
  onTabletOffsettedBy?       : ReactBucketCOLUMNOFFSET,
  onDesktopOffsettedBy?      : ReactBucketCOLUMNOFFSET,
  onLargeDesktopOffsettedBy? : ReactBucketCOLUMNOFFSET,

  /** Text Alignment */
  textAlign?: ReactBucketALIGN

  /** Columns Vertical Align */
  verticalAlign?: ReactBucketFLEXVERTICALALIGN

}

declare const Column: React.StatelessComponent<ColumnProps>

export default Column
