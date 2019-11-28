import * as React from 'react'

import { ReactBucketCOLOR, ReactBucketALIGN, ReactBucketICON } from '../../generic'

export interface PanelHeaderProps extends StrictPanelHeaderProps {
  [key: string]: any
}

export interface StrictPanelHeaderProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Text Color */
  color?: ReactBucketCOLOR

  /** Header Text */
  header?: React.ReactNode

  /** Header Icon */
  icon?: ReactBucketICON

  /** Subheader Text */
  subheader?: React.ReactNode

  /** Text Align */
  textAlign?: ReactBucketALIGN

}

declare const PanelHeader: React.FunctionComponent<PanelHeaderProps>

export default PanelHeader
