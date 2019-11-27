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

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, props: PanelFabProps) => void

  /** Primary State for FAB */
  primary?: boolean

}

declare const PanelFab: React.FunctionComponent<PanelFabProps>

export default PanelFab
