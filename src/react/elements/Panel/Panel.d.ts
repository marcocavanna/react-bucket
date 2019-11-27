import * as React from 'react'

import { AppBucketsALIGN, AppBucketsCOLORS, ReactBucketICON } from '../../generic'

import PanelFab, { PanelFabProps } from './PanelFab';
import PanelHeader from './PanelHeader'
import PanelBody from './PanelBody'

export interface PanelProps extends StrictPanelProps {
  [key: string]: any
}

export interface StrictPanelProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Text Color */
  color?: AppBucketsCOLORS,

  /** Content Shorthand */
  content?: React.ReactNode,

  /** Panel has Fab Button */
  fab?: boolean | ReactBucketICON

  /** Header Shorthand */
  header?: string,

  /** Icon Method Shorthand */
  icon?: ReactBucketICON,

  /** Loading Style for Panel */
  loading?: boolean

  /** Fab Click handler Function */
  onFabClick?: (e: React.SyntheticEvent, props: PanelFabProps) => void

  /** Subheader Shorthand */
  subheader?: string,

  /** Set Panel has table container */
  table?: boolean

  /** Text Align */
  textAlign?: AppBucketsALIGN

}

interface PanelComponent extends React.StatelessComponent<PanelProps> {
  Fab: typeof PanelFab
  Body: typeof PanelBody
  Header: typeof PanelHeader
}

declare const Panel: PanelComponent

export default Panel
