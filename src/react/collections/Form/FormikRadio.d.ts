import * as React from 'react'

import { FieldProps } from '../../elements/Field';

export interface FormikRadioProps extends FieldProps {
  /** Number of Columns */
  columns?: 1 | 2 | 3 | 4 | 6 | 12

  /**
   * A multi boolean value radio type will set different props
   * of the source object to true/false based on their value
   *
   * Ex two options [{ value: 'isOne' }, { value: 'isTwo' }]
   * using the multiBooleanValue will set isOne and isTwo to
   * true or false instead settings prop: 'isOne/isTwo
   */
  multiBooleanValue?: boolean

  /** Formik Input Name */
  name?: string

  /** Radio Options, each option will produce a Checkbox radio button */
  options?: { label?: React.ReactNode, value?: string | number | boolean }[]

  /** Formik Validation Function */
  validate?: (value: any) => string | void | Promise<string | void>

}

interface FormikRadioComponent extends React.StatelessComponent<FormikRadioProps> { }

declare const FormikRadio: FormikRadioComponent

export default FormikRadio
