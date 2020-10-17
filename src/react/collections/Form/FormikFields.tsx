import * as React from 'react';

import { Input, InputProps } from '../../elements/Input';

import withFormikField from './lib/withFormikField';


/* --------
 * Input Wrapped Component
 * -------- */
export const FormikInput = withFormikField<InputProps, string | number>({
  Component: function FormikInputComponent(props) {
    return (
      <Input
        danger={props.state.danger}
        success={props.state.success}
        warning={props.state.warning}
        {...props.rest}
        disabled={props.state.isSubmitting || props.rest.disabled}
      />
    );
  }
});
