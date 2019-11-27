import * as React from 'react';

import { ReactBucketALIGN, ReactBucketCOLORS, ReactBucketCOLUMNWIDTH, ReactBucketCOLUMNOFFSET, ReactBucketFLEXVERTICALALIGN } from '../../generic'

export interface ColumnProps extends StrictColumnProps {
  [key: string]: any
}

export interface StrictColumnProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Custom Font Color */
  color?: ReactBucketCOLORS

  /** Base Column Width */
  is?: ReactBucketCOLUMNWIDTH

  /** Responsive Columns Width */
  onTabletIs?       : ReactBucketCOLUMNWIDTH,
  onDesktopIs?      : ReactBucketCOLUMNWIDTH,
  onLargeDesktopIs? : ReactBucketCOLUMNWIDTH,

  /** Base Column Offset */
  offsettedBy?: ReactBucketCOLUMNOFFSET

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
