import * as React from 'react'

import { AppBucketsCOLORS, AppBucketsALIGN, ReactBucketICON } from '../../generic'

export interface PanelHeaderProps extends StrictPanelHeaderProps {
  [key: string]: any
}

export interface StrictPanelHeaderProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Text Color */
  color?: AppBucketsCOLORS

  /** Header Text */
  header?: string,

  /** Header Icon */
  icon?: ReactBucketICON,

  /** Subheader Text */
  subheader?: string,

  /** Text Align */
  textAlign?: AppBucketsALIGN

}

interface PanelHeaderComponent extends React.StatelessComponent<PanelHeaderProps> { }

declare const PanelHeader: PanelHeaderComponent

export default PanelHeader
