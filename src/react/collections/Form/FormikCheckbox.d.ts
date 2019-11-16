import * as React from 'react'

import { CheckboxProps } from '../../elements/Checkbox';

export interface FormikCheckboxProps extends CheckboxProps {
  /** Formik Input Name */
  name?: string

  /** Formik Validation Function */
  validate?: (value: any) => string | void | Promise<string | void>
}

interface FormikCheckboxComponent extends React.StatelessComponent<FormikCheckboxProps> { }

declare const FormikCheckbox: FormikCheckboxComponent

export default FormikCheckbox
