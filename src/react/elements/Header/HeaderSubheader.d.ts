import * as React from 'react'

import { AppBucketsCOLORS, AppBucketsFONTWEIGHT } from '../../generic';

export interface HeaderSubheaderProps extends StrictHeaderSubheaderProps {
  [key: string]: any
}

export interface StrictHeaderSubheaderProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Custom Font Color */
  color?: AppBucketsCOLORS,

  /** Content Property */
  content: React.ReactNode
}

declare const HeaderSubheader: React.StatelessComponent<HeaderSubheaderProps>

export default HeaderSubheader
