import * as React from 'react';

import { AppBucketsALIGN, AppBucketsCOLORS, AppBucketsFLEXHORIZONTALALIGN, AppBucketsFLEXVERTICALALIGN, AppBucketsBREAKPOINTS } from '../../generic';

export interface RowProps extends StrictRowProps {
  [key: string]: any
}

export interface StrictRowProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Custom Font Color */
  color?: AppBucketsCOLORS,

  /** Fluid property */
  columnsAlign?: AppBucketsFLEXHORIZONTALALIGN,

  /** Text Alignment */
  textAlign?: AppBucketsALIGN,

  /** Columns Vertical Align */
  verticalAlign?: AppBucketsFLEXVERTICALALIGN,

  /** Without Gap */
  withoutGap?: AppBucketsBREAKPOINTS
}

declare const Row: React.StatelessComponent<RowProps>

export default Row
