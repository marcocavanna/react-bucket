import * as React from 'react'

import { ReactBucketICON } from '../../generic';

import {
  ReactBucketCOLOR
} from '../../generic'

export interface PanelFabProps extends StrictPanelFabProps {
  [key: string]: any
}

export interface StrictPanelFabProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Fab Color */
  color?: ReactBucketCOLOR

  /** Fab Icon */
  icon?: ReactBucketICON

  /** On Fab Click Function */
  onFabClick?: Function

  /** Primary State for FAB */
  primary?: boolean

}

interface PanelFabComponent extends React.StatelessComponent<PanelFabProps> { }

declare const PanelFab: PanelFabComponent

export default PanelFab
