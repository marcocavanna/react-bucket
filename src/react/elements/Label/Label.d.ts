import * as React from 'react'

import { ReactBucketCOLOR, ReactBucketICON, ReactBucketShorthandItem } from '../../generic'

import LabelDetail, { LabelDetailProps } from './LabelDetail'
import LabelGroup from './LabelGroup'

export interface LabelProps extends StrictLabelProps {
  [key: string]: any
}

export interface StrictLabelProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Color Content */
  color?: ReactBucketCOLOR

  /** Content Shorthand */
  content?: React.ReactNode

  /** Set Danger Color */
  danger?: boolean

  /** Detail Short hand */
  detail?: ReactBucketShorthandItem<LabelDetailProps>

  /** Icon Shorthand */
  icon?: ReactBucketICON

  /** Set info Color */
  info?: boolean

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, props: LabelProps) => void

  /** Set primary Color */
  primary?: boolean

  /** Set success Color */
  success?: boolean

  /** Set warning Color */
  warning?: boolean

}

interface LabelComponent extends React.FunctionComponent<LabelProps> {
  Detail: typeof LabelDetail
  Group: typeof LabelGroup
}

declare const Label: LabelComponent

export default Label