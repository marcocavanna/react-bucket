import * as React from 'react'

import { AppBucketsSIZE } from '../../generic'

export interface LoaderProps extends StrictLoaderProps {
  [key: string]: any
}

export interface StrictLoaderProps {
  /** Active Props */
  active?: boolean,

  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Centered Loader */
  centered?: boolean,

  /** Content Property */
  content?: any,

  /** Inline Loader */
  inline?: boolean,

  /** Inverted Props */
  inverted?: boolean,

  /** Size Style */
  size?: AppBucketsSIZE

}

interface LoaderComponent extends React.StatelessComponent<LoaderProps> { }
/** In case of subcomponent append Name: typeof ImportedComponent in the interface */

declare const Loader: LoaderComponent

export default Loader