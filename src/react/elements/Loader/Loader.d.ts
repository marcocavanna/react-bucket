import * as React from 'react'

import { ReactBucketSIZE } from '../../generic'

export interface LoaderProps extends StrictLoaderProps {
  [key: string]: any
}

export interface StrictLoaderProps {
  /** Active Props */
  active?: boolean

  /** An element used to render */
  as?: React.ElementType

  /** Centered Loader */
  centered?: boolean

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Property */
  content?: React.ReactNode

  /** Inline Loader */
  inline?: boolean

  /** Inverted Props */
  inverted?: boolean

  /** Set the loader as an Overlay loader, absolute placed on parents */
  overlay?: boolean

  /** Size Style */
  size?: ReactBucketSIZE

  /** Set the Loader Type, default to `circular` */
  type: 'circular' | 'dots' | 'indeterminated bar'
}

declare const Loader: React.FunctionComponent<LoaderProps>

export default Loader
