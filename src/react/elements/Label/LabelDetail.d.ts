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

interface LabelDetailComponent extends React.StatelessComponent<LabelDetailProps> { }
/** In case of subcomponent append Name: typeof ImportedComponent in the interface */

declare const LabelDetail: LabelDetailComponent

export default LabelDetail
