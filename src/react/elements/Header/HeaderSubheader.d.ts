import * as React from 'react'

import { ReactBucketCOLOR } from '../../generic';

export interface HeaderSubheaderProps extends StrictHeaderSubheaderProps {
  [key: string]: any
}

export interface StrictHeaderSubheaderProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Custom Font Color */
  color?: ReactBucketCOLOR

  /** Content Property */
  content: React.ReactNode
}

declare const HeaderSubheader: React.FunctionComponent<HeaderSubheaderProps>

export default HeaderSubheader
