import * as React from 'react'

import { StrictFieldProps } from '../Field';

export interface CheckboxProps extends StrictCheckboxProps {
  [key: string]: any
}

export interface StrictCheckboxProps extends StrictFieldProps {
  /** An element used to render */
  as?: React.ElementType

  /** Set Checked State */
  checked?: boolean

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Initial Checked Value */
  defaultChecked?: boolean

  /** Initial Indeterminate state */
  defaultIndeterminate?: boolean

  /** Disable a Checkbox */
  disabled?: boolean

  /** Element ID */
  id?: string | number

  /** Indeterminate State */
  indeterminate?: boolean

  /** Label Element */
  label?: React.ReactNode

  /** HTML Element Name */
  name?: string

  /** On Change Event Handler */
  onChange?: (e: React.FormEvent<HTMLInputElement>, props: CheckboxProps) => void

  /** Function to execute on checked */
  onChecked?: (e: React.FormEvent<HTMLInputElement>, props: CheckboxProps) => void

  /** On Click Event Handler */
  onClick?: (e: React.MouseEvent<HTMLInputElement>, props: CheckboxProps) => void

  /** On Mouse Down Event Handler */
  onMouseDown?: (e: React.MouseEvent<HTMLInputElement>, props: CheckboxProps) => void

  /** On Mouse Up Event Handler */
  onMouseUp?: (e: React.MouseEvent<HTMLInputElement>, props: CheckboxProps) => void

  /** Function to execute on unchecked */
  onUnchecked?: (e: React.MouseEvent<HTMLInputElement>, props: CheckboxProps) => void

  /** Format a checkbox using radio style */
  radio?: boolean

  /** Set the readonly state for a checkbox */
  readOnly?: boolean

  /** Format a checkbox using slider style */
  slider?: boolean

  /** Set the TabIndex */
  tabIndex?: string | number

  /** Format to show a Toggle element */
  toggle?: boolean

  /** HTML Input Type */
  type?: 'checkbox' | 'radio'

  /** HTML Input Value */
  value?: string | number

}

declare class Checkbox extends React.Component<CheckboxProps> { }

export default Checkbox
