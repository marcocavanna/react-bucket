import * as React from 'react'

import { ReactBucketALIGN, ReactBucketCOLOR, ReactBucketICON } from '../../generic'

import PanelFab, { PanelFabProps } from './PanelFab';
import PanelHeader from './PanelHeader'
import PanelBody from './PanelBody'

export interface PanelProps extends StrictPanelProps {
  [key: string]: any
}

export interface StrictPanelProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Text Color */
  color?: ReactBucketCOLOR

  /** Content Shorthand */
  content?: React.ReactNode

  /** Panel has Fab Button */
  fab?: boolean | ReactBucketICON

  /** Header Shorthand */
  header?: string

  /** Icon Method Shorthand */
  icon?: ReactBucketICON

  /** Loading Style for Panel */
  loading?: boolean

  /** Fab Click handler Function */
  onFabClick?: (e: React.SyntheticEvent, props: PanelFabProps) => void

  /** Subheader Shorthand */
  subheader?: string

  /** Set Panel has table container */
  table?: boolean

  /** Text Align */
  textAlign?: ReactBucketALIGN

}

interface PanelComponent extends React.StatelessComponent<PanelProps> {
  Fab: typeof PanelFab
  Body: typeof PanelBody
  Header: typeof PanelHeader
}

declare const Panel: PanelComponent

export default Panel
