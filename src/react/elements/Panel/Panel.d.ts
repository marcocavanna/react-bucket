import * as React from 'react'

import { ReactBucketALIGN, ReactBucketCOLOR, ReactBucketICON, ReactBucketShorthandItem } from '../../generic'

import PanelFab, { PanelFabProps } from './PanelFab';
import PanelHeader from './PanelHeader'
import PanelBody, { PanelBodyProps } from './PanelBody'
import PanelSection from './PanelSection'

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
  content?: ReactBucketShorthandItem<PanelBodyProps>

  /** Panel has Fab Button */
  fab?: boolean | ReactBucketICON

  /** Header Shorthand */
  header?: React.ReactNode

  /** Icon Method Shorthand */
  icon?: ReactBucketICON

  /** Loading Style for Panel */
  loading?: boolean

  /** Fab Click handler Function */
  onFabClick?: (e: React.MouseEvent<HTMLButtonElement>, props: PanelFabProps) => void

  /** Subheader Shorthand */
  subheader?: React.ReactNode

  /** Set Panel has table container */
  table?: boolean

  /** Text Align */
  textAlign?: ReactBucketALIGN

}

interface PanelComponent extends React.FunctionComponent<PanelProps> {
  Fab: typeof PanelFab
  Body: typeof PanelBody
  Header: typeof PanelHeader
  Section: typeof PanelSection
}

declare const Panel: PanelComponent

export default Panel
