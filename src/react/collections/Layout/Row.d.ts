import * as React from 'react';

import { ReactBucketALIGN, ReactBucketCOLORS, ReactBucketFLEXHORIZONTALALIGN, ReactBucketFLEXVERTICALALIGN, ReactBucketBREAKPOINTS } from '../../generic';

export interface RowProps extends StrictRowProps {
  [key: string]: any
}

export interface StrictRowProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Custom Font Color */
  color?: ReactBucketCOLORS

  /** Fluid property */
  columnsAlign?: ReactBucketFLEXHORIZONTALALIGN

  /** Text Alignment */
  textAlign?: ReactBucketALIGN

  /** Columns Vertical Align */
  verticalAlign?: ReactBucketFLEXVERTICALALIGN

  /** Without Gap */
  withoutGap?: ReactBucketBREAKPOINTS
}

declare const Row: React.StatelessComponent<RowProps>

export default Row
