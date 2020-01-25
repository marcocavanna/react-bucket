import * as React from 'react'

import { InputProps } from '../../elements/Input';

export interface FormikTimeProps extends InputProps {
  /** Formik Input Name */
  name?: string

  /** Formik Validation Function */
  validate?: (value: any) => string | void | Promise<string | void>
}

interface FormikTimeComponent extends React.StatelessComponent<FormikTimeProps> { }

declare const FormikTime: FormikTimeComponent

export default FormikTime
