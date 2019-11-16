import * as React from 'react'

import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon'
import { AppBucketsCOLORS } from '../../generic'

import LabelDetail from './LabelDetail'
import LabelGroup from './LabelGroup'

export interface LabelProps extends StrictLabelProps {
  [key: string]: any
}

export interface StrictLabelProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Color Content */
  color?: AppBucketsCOLORS,

  /** Content Shorthand */
  content?: any,

  /** Detail Short hand */
  detail?: any,

  /** Icon Shorthand */
  icon?: AppBucketsICON
}

declare class Label extends React.Component<LabelProps, {}> {
  static Detail: typeof LabelDetail;
  static Group: typeof LabelGroup;
}

export default Label