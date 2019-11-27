import * as React from 'react'

import Row from './Row'
import Column from './Column'

import { AppBucketsALIGN, AppBucketsRESPONSIVE, AppBucketsCOLORS } from '../../generic'

export interface LayoutProps extends StrictLayoutProps {
  [key: string]: any
}

export interface StrictLayoutProps {
  /** An element used to render */
  as?: any,

  /** Custom background color */
  background?: AppBucketsCOLORS,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Custom Font Color */
  color?: AppBucketsCOLORS,

  /** Fluid property */
  fluid?: boolean,

  /** Text Alignment */
  textAlign?: AppBucketsALIGN,

  /** Container Fixed Width */
  width?: AppBucketsRESPONSIVE
}

interface LayoutComponent extends React.StatelessComponent<LayoutProps> {
  Row: typeof Row,
  Column: typeof Column
}

declare const Layout: LayoutComponent

export default Layout
