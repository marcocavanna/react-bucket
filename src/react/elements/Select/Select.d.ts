import * as React from 'react'
import * as ReactSelect from 'react-select';

import { Props as ReactSelectProps } from 'react-select';

import { StrictFieldProps } from '../Field';

export interface SelectProps extends StrictSelectProps {
  [key: string]: any
}

export interface StrictSelectProps extends StrictFieldProps, ReactSelectProps {

  /** Set the Custom Option Component */
  CustomOptionComponent?: React.ComponentType<ReactSelect.OptionProps<StrictSelectProps>>

  /** Set if selected option is clearable */
  clearable?: boolean

  /** Set the Select as Creatable */
  creatable?: boolean

  /** Set if component is Disabled */
  disabled?: boolean

  /** Set the Select as Async Type */
  isAsync?: boolean

  /** Optional Props to help Formik Selector compute correctly value */
  isInitiallyLoaded?: boolean

  /** Set if must show loader */
  loading?: boolean

  /** onBlur Handler */
  onBlur?: (e: React.FormEvent<HTMLSelectElement>, props: SelectProps) => void

  /** onChange handler */
  onChange?: (value: any, props: SelectOnChangeData) => void

  /** Set Options */
  options?: ReactSelect.OptionTypeBase[]

  /** Set if field is required */
  required?: boolean

  /** Set the Tab Index */
  tabIndex?: number
}

export interface SelectOnChangeData extends SelectProps {
  value: any,
  action: ReactSelect.ActionTypes
}

interface SelectComponent extends React.PureComponent<SelectProps> { }

declare const Select: SelectComponent

export default Select
