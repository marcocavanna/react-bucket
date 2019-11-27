import * as React from 'react'

import { ReactBucketCOLORS, ReactBucketALIGN, ReactBucketFONTWEIGHT } from '../../generic'

export interface PanelBodyProps extends StrictPanelBodyProps {
  [key: string]: any
}

export interface StrictPanelBodyProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Text Color */
  color?: ReactBucketCOLORS

  /** Content */
  content?: React.ReactNode

  /** Font weight */
  fontWeight?: ReactBucketFONTWEIGHT

  /** Text Align */
  textAlign?: ReactBucketALIGN

}

interface PanelBodyComponent extends React.StatelessComponent<PanelBodyProps> { }
/** In case of subcomponent append Name: typeof ImportedComponent in the interface */

declare const PanelBody: PanelBodyComponent

export default PanelBody
