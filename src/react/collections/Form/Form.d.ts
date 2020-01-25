import * as React from 'react';

import { ReactBucketSIZE } from '../../generic';

import Input from '../../elements/Input';
import FormikCheckbox from './FormikCheckbox';
import FormikEditor from './FormikEditor';
import FormikDayPicker from './FormikDayPicker';
import FormikInput from './FormikInput';
import FormikPlace from './FormikPlace';
import FormikRadio from './FormikRadio';
import FormikSelect from './FormikSelect';

export interface FormProps extends StrictFormProps {
  [key: string]: any
}

export interface StrictFormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  /** The Action */
  action?: string

  /** An element used to render the componenet */
  as?: React.ElementType

  /** Childrens */
  children?: React.ReactNode

  /** Additional User defined classes */
  className?: string

  /** Automatically show error message */
  error?: bool

  /** Automatically show loading */
  loading?: bool

  /** Change form size */
  size?: ReactBucketSIZE

  /** Automatically show Success */
  success?: bool

  /** Automatically show warning */
  warning?: bool
}

declare interface Form extends React.ComponentClass<FormProps, {}> {
  Input: typeof Input
  FormikCheckbox: typeof FormikCheckbox
  FormikEditor: typeof FormikEditor
  FormikDayPicker: typeof FormikDayPicker
  FormikInput: typeof FormikInput
  FormikPlace: typeof FormikPlace
  FormikRadio: typeof FormikRadio
  FormikSelect: typeof FormikSelect
}

declare const FormComponent: Form

export default FormComponent
