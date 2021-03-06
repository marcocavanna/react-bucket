import { ClickHandler, ReactBucketComponentProps } from '../../generic';

import { StrictFieldProps } from '../Field';


export interface CheckboxProps extends ReactBucketComponentProps<StrictCheckboxProps, 'input'> {

}

export interface StrictCheckboxProps extends Omit<StrictFieldProps, 'actions' | 'actionsPosition'> {
  /** Manual control checked state */
  checked?: boolean;

  /** Set the default checked value */
  defaultChecked?: boolean;

  /** Is indeterminate */
  indeterminate?: boolean;

  /** On Checked Event */
  onChecked?: ClickHandler<HTMLLabelElement, CheckboxProps>;

  /** On Click Handler */
  onClick?: ClickHandler<HTMLLabelElement, CheckboxProps>;

  /** On Unchecked Event */
  onUnchecked?: ClickHandler<HTMLLabelElement, CheckboxProps>;

  /** Format the Checkbox as a Radio Button */
  radio?: boolean;

  /** Format the Checkbox as a Switch */
  switch?: boolean;
}
