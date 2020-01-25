import * as React from 'react';

import {
  ReactBucketALIGN,
  ReactBucketCOLOR,
  ReactBucketFLEXHORIZONTALALIGN,
  ReactBucketFLEXVERTICALALIGN,
  ReactBucketBREAKPOINT,
  ReactBucketShorthandCollection
} from '../../generic';

import { ColumnProps } from './Column';

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
  color?: ReactBucketCOLOR

  /** Columns Collection Shorthand */
  columns?: ReactBucketShorthandCollection<ColumnProps>

  /** Fluid property */
  columnsAlign?: ReactBucketFLEXHORIZONTALALIGN

  /** Content Shorthand */
  content?: React.ReactNode

  /** Text Alignment */
  textAlign?: ReactBucketALIGN

  /** Columns Vertical Align */
  verticalAlign?: ReactBucketFLEXVERTICALALIGN

  /** Without Gap */
  withoutGap?: ReactBucketBREAKPOINT
}

declare const Row: React.StatelessComponent<RowProps>

export default Row
