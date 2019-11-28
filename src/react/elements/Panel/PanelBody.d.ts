import * as React from 'react'

import { ReactBucketCOLOR, ReactBucketALIGN, ReactBucketFONTWEIGHT } from '../../generic'

export interface PanelBodyProps extends StrictPanelBodyProps {
  [key: string]: any
}

export interface StrictPanelBodyProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Text Color */
  color?: ReactBucketCOLOR

  /** Content */
  content?: React.ReactNode

  /** Font weight */
  fontWeight?: ReactBucketFONTWEIGHT

  /** Text Align */
  textAlign?: ReactBucketALIGN

}

declare const PanelBody: React.FunctionComponent<PanelBodyProps>

export default PanelBody
