import * as React from 'react'

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

  /** Label Shorthand */
  label?: React.ReactNode
}

declare const PanelSection: React.FunctionComponent<PanelSectionProps>

export default PanelSection
