import * as React from 'react'

import { ReactBucketCOLORS, ReactBucketFONTWEIGHT } from '../../generic';

export interface HeaderContentProps extends StrictHeaderContentProps {
  [key: string]: any
}

export interface StrictHeaderContentProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Custom Font Color */
  color?: ReactBucketCOLORS

  /** Content Property */
  content: React.ReactNode
}

declare const HeaderContent: React.StatelessComponent<HeaderContentProps>

export default HeaderContent
