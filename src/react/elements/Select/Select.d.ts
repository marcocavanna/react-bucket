import * as React from 'react'
import * as ReactSelect from 'react-select';

import { StrictFieldProps } from '../Field';

export interface SelectProps extends StrictSelectProps {
  [key: string]: any
}

export interface StrictSelectProps extends StrictFieldProps {
  /** Set the Select as Async Type */
  async?: boolean

  /** Set if selected option is clearable */
  clearable?: boolean

  /** Set the Select as Creatable */
  creatable?: boolean

  /** Set if component is Disabled */
  disabled?: boolean

  /** Set if must show loader */
  loading?: boolean

  /** onBlur Handler */
  onBlur(e: React.SyntheticEvent): void

  /** onChange handler */
  onChange(data: any, props: StrictSelectProps): void

  /** Set Options */
  options?: ReactSelect.OptionTypeBase[]

  /** Set if field is required */
  required?: boolean

  /** Set the Tab Index */
  tabIndex?: number
}

interface SelectComponent extends React.StatelessComponent<SelectProps> { }

declare const Select: SelectComponent

export default Select
