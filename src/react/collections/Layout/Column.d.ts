import * as React from 'react';

import { AppBucketsALIGN, AppBucketsCOLORS, AppBucketsCOLUMNWIDTH, AppBucketsCOLUMNOFFSET, AppBucketsFLEXVERTICALALIGN } from '../../generic'

export interface ColumnProps extends StrictColumnProps {
  [key: string]: any
}

export interface StrictColumnProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Custom Font Color */
  color?: AppBucketsCOLORS,

  /** Base Column Width */
  is?: AppBucketsCOLUMNWIDTH,

  /** Responsive Columns Width */
  onTabletIs?       : AppBucketsCOLUMNWIDTH,
  onDesktopIs?      : AppBucketsCOLUMNWIDTH,
  onLargeDesktopIs? : AppBucketsCOLUMNWIDTH,

  /** Base Column Offset */
  offsettedBy?: AppBucketsCOLUMNOFFSET,

  /** Responsive Column Offset */
  onTabletOffsettedBy?       : AppBucketsCOLUMNOFFSET,
  onDesktopOffsettedBy?      : AppBucketsCOLUMNOFFSET,
  onLargeDesktopOffsettedBy? : AppBucketsCOLUMNOFFSET,

  /** Text Alignment */
  textAlign?: AppBucketsALIGN,

  /** Columns Vertical Align */
  verticalAlign?: AppBucketsFLEXVERTICALALIGN

}

declare const Column: React.StatelessComponent<ColumnProps>

export default Column
