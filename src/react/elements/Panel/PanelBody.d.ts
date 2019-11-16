import * as React from 'react'

import { AppBucketsCOLORS, AppBucketsALIGN, AppBucketsFONTWEIGHT } from '../../generic'

export interface PanelBodyProps extends StrictPanelBodyProps {
  [key: string]: any
}

export interface StrictPanelBodyProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Text Color */
  color?: AppBucketsCOLORS,

  /** Content */
  content?: React.ReactNode,

  /** Font weight */
  fontWeight?: AppBucketsFONTWEIGHT,

  /** Text Align */
  textAlign?: AppBucketsALIGN

}

interface PanelBodyComponent extends React.StatelessComponent<PanelBodyProps> { }
/** In case of subcomponent append Name: typeof ImportedComponent in the interface */

declare const PanelBody: PanelBodyComponent

export default PanelBody