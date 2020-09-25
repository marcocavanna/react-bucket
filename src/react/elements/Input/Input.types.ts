import { ChangeHandler, ClickHandler, FocusHandler, ReactBucketComponentProps } from '../../generic';

import { StrictFieldProps } from '../Field';


export interface InputProps extends ReactBucketComponentProps<StrictInputProps, 'input'> {
}

export interface StrictInputProps extends Omit<StrictFieldProps, 'onChange'> {
  /** Set the Input as Currency Input */
  currency?: boolean;

  /** On Blur Event */
  onBlur?: FocusHandler<HTMLInputElement, InputProps>;

  /** On Change Event */
  onChange?: ChangeHandler<HTMLInputElement, InputProps>;

  /** On Click Event */
  onClick?: ClickHandler<HTMLInputElement, InputProps>;

  /** On Focus Event */
  onFocus?: FocusHandler<HTMLInputElement, InputProps>;

  /** Auto Select all content on click */
  selectAllOnClick?: boolean;

  /** Render the input as a Text Area */
  textarea?: boolean;
}
