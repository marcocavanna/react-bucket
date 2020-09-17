import * as React from 'react';

import { ReactBucketComponentProps, SharedComponentStateProps } from '../../generic';

import { StrictFieldProps } from '../Field';


export interface InputProps extends ReactBucketComponentProps<StrictInputProps, 'input'> {
}

export interface StrictInputProps extends SharedComponentStateProps, StrictFieldProps {
  /** Set the Input as Currency Input */
  currency?: boolean;

  /** On Blur Event */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>, props: InputProps) => void;

  /** On Change Event */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, props: InputProps) => void;

  /** On Click Event */
  onClick?: (e: React.MouseEvent<HTMLInputElement>, props: InputProps) => void;

  /** On Focus Event */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>, props: InputProps) => void;

  /** Render the input as a Text Area */
  textarea?: boolean;
}
