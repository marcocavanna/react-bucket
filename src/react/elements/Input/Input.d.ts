import * as React from 'react'

import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon';
import { AppBucketsSIZE } from '../../generic'

import { StrictFieldProps } from '../Field';

export interface InputProps extends StrictInputProps {
  [key: string]: any
}

export interface StrictInputProps extends StrictFieldProps, React.InputHTMLAttributes<HTMLInputElement> {
  /** Show the Mask whenever the input is not focused */
  alwaysShowMask?: boolean

  /** Disabled Field */
  disabled?: boolean,

  /**
   * Mask string. Format characters are:
   * * `9`: `0-9`
   * * `a`: `A-Z, a-z`
   * * `\*`: `A-Z, a-z, 0-9`
   *
   * Any character can be escaped with backslash, which usually will appear as double backslash in JS strings.
   * For example, German phone mask with unremoveable prefix +49 will look like `mask="+4\\9 99 999 99"` or `mask={"+4\\\\9 99 999 99"}`
   */
  mask: string;

  /**
   * Character to cover unfilled editable parts of mask. Default character is "_". If set to null, unfilled parts will be empty, like in ordinary input.
   */
  maskChar?: string | null;

  /** Input Tab Index */
  tabIndex?: number,

  /** Input Type */
  type?: 'date' | 'email' | 'file' | 'image' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url',
}

declare class Input extends React.Component<InputProps, {}> { }

export default Input
