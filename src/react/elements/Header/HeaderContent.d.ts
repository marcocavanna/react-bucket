import * as React from 'react'

import { ReactBucketCOLOR } from '../../generic';

export interface HeaderContentProps extends StrictHeaderContentProps {
  [key: string]: any
}

export interface StrictHeaderContentProps {
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

declare const HeaderContent: React.FunctionComponent<HeaderContentProps>

export default HeaderContent
