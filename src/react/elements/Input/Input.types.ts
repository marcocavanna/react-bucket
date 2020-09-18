import * as React from 'react';

import { ReactBucketComponentProps } from '../../generic';

import { StrictFieldProps } from '../Field';


export type OnInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, props: InputProps) => void;

export type OnInputFocusChangeHandler = (e: React.FocusEvent<HTMLInputElement>, props: InputProps) => void;

export type OnInputClickHandler = (e: React.MouseEvent<HTMLInputElement>, props: InputProps) => void;

export interface InputProps extends ReactBucketComponentProps<StrictInputProps, 'input'> {
}

export interface StrictInputProps extends Omit<StrictFieldProps, 'onChange'> {
  /** Set the Input as Currency Input */
  currency?: boolean;

  /** On Blur Event */
  onBlur?: OnInputFocusChangeHandler;

  /** On Change Event */
  onChange?: OnInputChangeHandler;

  /** On Click Event */
  onClick?: OnInputClickHandler;

  /** On Focus Event */
  onFocus?: OnInputFocusChangeHandler;

  /** Auto Select all content on click */
  selectAllOnClick?: boolean;

  /** Render the input as a Text Area */
  textarea?: boolean;
}
