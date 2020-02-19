import * as React from 'react'

import { ReactBucketICON } from '../../generic';

import { StrictPortalProps } from '../../addons/Portal';
import { ButtonProps } from '../../elements/Button';

import { default as ModalActions, ModalActionsProps } from './ModalActions';
import { default as ModalContent, ModalContentProps } from './ModalContent';
import { default as ModalHeader, ModalHeaderProps } from './ModalHeader';

export interface ModalProps extends StrictModalProps {
  [key: string]: any
}

export interface StrictModalProps {
  /** An element used to render */
  as?: React.ElementType

  /** Shorthand Properties for Modal Actions */
  actions?: ButtonProps[]

  /** Autosized Width */
  autosized?: boolean

  /** Reduce Modal graphic */
  basic?: boolean

  /** Show a modal centered */
  centered?: boolean

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** The Modal Close Icn */
  closeIcon?: React.ReactNode | boolean | ReactBucketICON

  /** Set if a modal must close on dimmer click */
  closeOnDimmerClick?: boolean

  /** Set if modal must close on document click */
  closeOnDocumentClick?: boolean

  /** Content Shorthand */
  content?: React.ReactNode

  /** Initial open value */
  defaultOpen?: boolean

  /** Set dimmer properties */
  dimmer?: boolean | 'inverted' | 'blurring'

  /** Event Pool namespace */
  eventPool?: string

  /** Modal header shorthand */
  header?: React.ReactNode

  /** Show modal as a Light Box */
  lightbox?: boolean

  /** Node where to mount Modal */
  mountNode?: any

  /** On Action click function handler */
  onActionClick?: (e: React.MouseEvent<HTMLElement>, props: ModalProps) => void

  /** On Close Function handler */
  onClose?: (e: React.MouseEvent<HTMLElement>, props: ModalProps) => void

  /** On Mount Function handler */
  onMount?: (nothing: null, props: ModalProps) => void

  /** On Open Function handler */
  onOpen?: (e: React.MouseEvent<HTMLElement>, props: ModalProps) => void

  /** On Unmount function handler */
  onUnmount?: (nothing: null, props: ModalProps) => void

  /** Set if the modal is opened or not */
  open?: boolean

  /** Size Modal Props */
  size?: 'small' | 'big' | 'extra-big'

  /** Custom Style */
  style?: React.CSSProperties

  /** The element that will trigger the Modal */
  trigger?: React.ReactNode

}

interface ModalComponent extends React.ComponentClass<ModalProps> {
  Actions: typeof ModalActions
  Content: typeof ModalContent
  Header: typeof ModalHeader

  static splitProps(props: any): [StrictModalProps, any]
}

declare const Modal: ModalComponent

export default Modal
