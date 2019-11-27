import * as React from 'react'

import Row from './Row'
import Column from './Column'

import { ReactBucketALIGN, ReactBucketRESPONSIVE, ReactBucketCOLORS } from '../../generic'

export interface LayoutProps extends StrictLayoutProps {
  [key: string]: any
}

export interface StrictLayoutProps {
  /** An element used to render */
  as?: React.ElementType

  /** Custom background color */
  background?: ReactBucketCOLORS

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Custom Font Color */
  color?: ReactBucketCOLORS

  /** Fluid property */
  fluid?: boolean

  /** Text Alignment */
  textAlign?: ReactBucketALIGN

  /** Container Fixed Width */
  width?: ReactBucketRESPONSIVE
}

interface LayoutComponent extends React.StatelessComponent<LayoutProps> {
  Row?: typeof Row
  Column: typeof Column
}

declare const Layout: LayoutComponent

export default Layout
