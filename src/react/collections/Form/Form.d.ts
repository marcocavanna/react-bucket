import * as React from 'react';

import { AppBucketsSIZE } from '../../generic';

import Input from '../../elements/Input';
import FormikCheckbox from './FormikCheckbox';
import FormikDayPicker from './FormikDayPicker';
import FormikInput from './FormikInput';
import FormikSelect from './FormikSelect';

export interface FormProps extends StrictFormProps {
  [key: string]: any
}

export interface StrictFormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  /** The Action */
  action?: string,

  /** An element used to render the componenet */
  as?: any,

  /** Childrens */
  children?: React.ReactNode,

  /** Additional User defined classes */
  className?: string,

  /** Automatically show error message */
  error?: bool,

  /** Automatically show loading */
  loading?: bool,

  /** Change form size */
  size?: AppBucketsSIZE,

  /** Automatically show Success */
  success?: bool,

  /** Automatically show warning */
  warning?: bool
}

declare interface Form extends React.ComponentClass<FormProps, {}> {
  Input: typeof Input
  FormikCheckbox: typeof FormikCheckbox
  FormikDayPicker: typeof FormikDayPicker
  FormikInput: typeof FormikInput
  FormikSelect: typeof FormikSelect
}

declare const FormComponent: Form

export default FormComponent
