import * as React from 'react'

import { ReactBucketSIZE } from '../../generic'

import { StrictFieldProps } from '../Field';

import InputGroup from './InputGroup';

export interface InputProps extends StrictInputProps {
  [key: string]: any
}

export interface StrictInputProps extends StrictFieldProps, React.InputHTMLAttributes<HTMLInputElement> {
  /** Show the Mask whenever the input is not focused */
  alwaysShowMask?: boolean

  /** Disabled Field */
  disabled?: boolean

  /**
   * Mask string. Format characters are:
   * * `9`: `0-9`
   * * `a`: `A-Z, a-z`
   * * `\*`: `A-Z, a-z, 0-9`
   *
   * Any character can be escaped with backslash, which usually will appear as double backslash in JS strings.
   * For example, German phone mask with unremoveable prefix +49 will look like `mask="+4\\9 99 999 99"` or `mask={"+4\\\\9 99 999 99"}`
   */
  mask?: string;

  /**
   * Character to cover unfilled editable parts of mask. Default character is "_". If set to null, unfilled parts will be empty, like in ordinary input.
   */
  maskChar?: string | null;

  /** Max TextArea Rows Count */
  maxRows?: number

  /** Min TextArea Rows Count */
  minRows?: number

  /**
   * Called on change.
   *
   * @param {ChangeEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and a proposed value.
   */
  onChange?: (event: React.FormEvent<HTMLInputElement>, props: InputOnChangeData) => void,

  /** Currency Precision */
  precision?: number,

  /** Input Tab Index */
  tabIndex?: number

  /** Render the component as a Text Area */
  textarea?: boolean

  /** Input Type */
  type?: 'date' | 'email' | 'file' | 'image' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
}

export interface InputOnChangeData extends InputProps {
  value: string
}

declare class Input extends React.PureComponent<InputProps, {}> {
  static Group: typeof InputGroup
}

export default Input
