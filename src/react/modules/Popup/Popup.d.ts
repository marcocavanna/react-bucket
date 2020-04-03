import * as React from 'react'

import { ReactBucketSIZE } from '../../generic';

import PopupHeader from './PopupHeader';
import PopupContent from './PopupContent';

import { StrictPortalProps } from '../../addons/Portal';

export interface PopupProps extends StrictPopupProps {
  [key: string]: any
}

export interface StrictPopupProps extends StrictPortalProps {
  /** An element used to render */
  as?: React.ElementType

  /** Basic Style */
  basic?: boolean

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Disabled State */
  disabled?: boolean

  /** Header Shorthand */
  header?: any

  /** Hide on Close */
  hideOnScroll?: boolean

  /** Not close popper on hover */
  hoverable?: boolean

  /** Inverted Style */
  inverted?: boolean

  /** Offset properties with units px, % %p, vw, vh */
  offset?: number | string

  /** Triggers to Open the Popup */
  on?: 'hover' | 'click' | 'focus' | ('hover' | 'click' | 'focus')[]

  /** onClose Handler */
  onClose?: Function

  /** onMount Handler */
  onMount?: Function

  /** onUnmount Handler */
  onUnmount?: Function

  /** onOpen Handler */
  onOpen?: Function

  /** Handler on Outside Portal Click */
  onOutsideClick?: Function

  /** Position for the popover. */
  position?:
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
    | 'left center'
    | 'right center'
    | 'top center'
    | 'bottom center',

  /** An object containing custom settings for the Popper.js modifiers. */
  popperModifiers?: object

  /** A popup can have dependencies which update will schedule a position update. */
  popperDependencies?: any[]

  /** Size modifier */
  size?: ReactBucketSIZE

  /** User defined Style */
  style?: Object

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: React.ReactNode

}

interface PopupComponent extends React.ComponentClass<PopupProps> {
  Content: typeof PopupContent
  Header: typeof PopupHeader
}

declare const Popup: PopupComponent

export default Popup
