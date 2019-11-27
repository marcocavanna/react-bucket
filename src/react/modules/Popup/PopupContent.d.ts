import * as React from 'react'

export interface PopupHeaderProps extends StrictPopupHeaderProps {
  [key: string]: any
}

export interface StrictPopupHeaderProps {
  /** An element used to render */
  as?: any

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

}

interface PopupHeaderComponent extends React.StatelessComponent<PopupHeaderProps> { }

declare const PopupHeader: PopupHeaderComponent

export default PopupHeader
