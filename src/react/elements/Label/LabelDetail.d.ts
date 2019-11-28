import * as React from 'react'

export interface LabelDetailProps extends StrictLabelDetailProps {
  [key: string]: any
}

export interface StrictLabelDetailProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Label Content */
  content?: React.ReactNode

}

declare const LabelDetail: React.FunctionComponent<LabelDetailProps>

export default LabelDetail
