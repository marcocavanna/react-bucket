import * as React from 'react';

import { FormikContextType, FieldMetaProps } from 'formik';

import { StrictFieldProps } from '../../../elements/Field';

declare interface IFormikFieldState {
  /** Error state for Field Container */
  error: boolean

  /** A Checker to get if field has Messages to Show */
  hasMessages: boolean

  /** Get if the parent form is submitting */
  isSubmitting: boolean

  /** Field Message */
  message: string

  /** Success State for Field Container */
  success: boolean

  /** Warning State for Field Container */
  warning: boolean
}

declare interface IFormikFieldMeta extends FieldMetaProps { }

declare interface IFormikFieldRest extends IFormikFieldStrictRest {
  [key: string]: any
}

declare interface IFormikFieldStrictRest extends StrictFieldProps {
  /** Field Name */
  name: string

  /** On Blur Event Handler */
  onBlur: (e: React.FocusEvent<any>) => void
  onBlur: <T = any>(fieldOrEvent: T) => T extends string ? (e: any) => void : void

  /** On Change Event Handler */
  onChange: (e: React.ChangeEvent<any>) => void

  /** Field Value */
  value: any
}

declare interface IFormikFieldComponentProps {
  /** State of Field */
  state: IFormikFieldState

  /** Meta Props */
  meta: IFormikFieldMeta

  /** Rest Properties */
  rest: IFormikFieldRest
}

declare interface IFormikFieldComputeValueProps {
  [key: string]: any

  /** Field Value Name */
  name: string
}

declare interface IFormikFieldHandleChangeProps extends IFormikFieldComputeValueProps {
  /** Field value */
  value: any
}

declare function withFormikField(configuration: {

  /**
   * The Component that will be used to render
   * the Formik Field. To the component will be
   * passed through props, the state
   */
  Component: React.ComponentType<IFormikFieldComponentProps>

  /**
   * This function will be called to compute the
   * field value that have to be passed to component.
   * Result value will be setted on value props of
   * the child Component `rest` props
   */
  computeValue?: (value: any, props: IFormikFieldComputeValueProps) => any

  /**
   * Original Handle Change function provided by formik bag
   * could be ovrewritten setting the `handleChange` field.
   * Into this function must manually call the `formik.setFieldValue(name, value)`
   * function to set the new value
   */
  handleChange?: (formik: FormikContextType<any>, field: IFormikFieldHandleChangeProps, e: React.ChangeEvent<any>, props: object) => void
  handleChange?: (formik: FormikContextType<any>, field: IFormikFieldHandleChangeProps, props: object) => void

  /**
   * By default, the change event will not set
   * the touch property on formik field, but only
   * the blur event. To manually set the touch boolean
   * to true on a field change, set this props to `true`
   */
  touchOnChange: boolean

}): React.FunctionComponent<any>;

export default withFormikField;
