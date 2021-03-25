import { Props as InputMaskProps } from 'react-input-mask';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

import { ChangeHandler, ClickHandler, FocusHandler, ReactBucketComponentProps } from '../../generic';

import { StrictFieldProps } from '../Field';


export interface InputProps extends ReactBucketComponentProps<StrictInputProps, 'input'> {
}

export interface StrictInputProps extends StrictFieldProps {
  /** Default input value */
  defaultValue?: string;

  /** Define input mask */
  masked?: Pick<InputMaskProps, 'mask' | 'maskPlaceholder' | 'alwaysShowMask'>;

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

  /** Set text area component props */
  textareaProps?: Pick<TextareaAutosizeProps, 'useCacheForDOMMeasurements' | 'rows' | 'minRows' | 'maxRows'>;

  /** Limit value to string only */
  value?: string;
}
