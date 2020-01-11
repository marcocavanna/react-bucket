import * as React from 'react'

import { ReactBucketALIGN, ReactBucketFONTWEIGHT } from '../../generic';

export interface PanelSectionProps extends StrictPanelSectionProps {
  [key: string]: any
}

export interface StrictPanelSectionProps {
  /** An element used to render */
  as?: React.ElementType,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: React.ReactNode

  /** Prepend a Divider */
  divided?: boolean

  /** Set the Font Weight */
  fontWeight: ReactBucketFONTWEIGHT

  /** Label Shorthand */
  label?: React.ReactNode,

  /** Remove Margin Bottom */
  noMargin?: boolean

  /** Panel Section text Alignment */
  textAlign?: ReactBucketALIGN
}

declare const PanelSection: React.FunctionComponent<PanelSectionProps>

export default PanelSection
