import * as React from 'react'

import { ButtonProps } from '../../elements/Button';

export interface ModalActionsProps extends StrictModalActionsProps {
  [key: string]: any
}

export interface StrictModalActionsProps {
  /** An array of Buttons */
  actions?: ButtonProps[]

  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Shorthand */
  content?: React.ReactNode

  /** On action Click handler */
  onActionClick?: (e: React.SyntheticEvent, props: ButtonProps) => void
}

interface ModalActionsComponent extends React.StatelessComponent<ModalActionsProps> { }

declare const ModalActions: ModalActionsComponent

export default ModalActions
