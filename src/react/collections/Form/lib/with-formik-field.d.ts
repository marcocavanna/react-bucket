import * as React from 'react';

import { FormikContextType } from 'formik';

declare function withFormikField(configuration: {
  /** The Component used to render the Field */
  Component?: React.ReactNode
  /** A custom function that will be invoked to compute field value */
  computeValue: (value: any, props: object) => any
  /** A onChange custom handler that will be executed instead original */
  handleChange?: (formik: FormikContextType<any>, field: { name: string, value: any }, e: React.SyntheticEvent | object, props: object) => void
  /** Touch field on change */
  touchOnChange: boolean
}): React.StatelessComponent<any>;

export default withFormikField;
