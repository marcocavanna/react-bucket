import * as React from 'react'

import { InputProps } from '../../elements/Input';

export interface FormikInputProps extends InputProps {
  /** Formik Input Name */
  name?: string

  /** Formik Validation Function */
  validate?: (value: any) => string | void | Promise<string | void>
}

interface FormikInputComponent extends React.StatelessComponent<FormikInputProps> { }

declare const FormikInput: FormikInputComponent

export default FormikInput
