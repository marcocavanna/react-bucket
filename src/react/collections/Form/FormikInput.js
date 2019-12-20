import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../elements/Input';

import withFormikField from './lib/with-formik-field';

const FormikInputComponent = ({ state, meta, rest }) => (
  <>
    <Input
      {...rest}
      error={meta.touched && state.error}
      success={meta.touched && state.success}
      warning={meta.touched && state.warning}
      messages={state.hasMessages && meta.touched ? [state.message] : null}
      disabled={state.isSubmitting || rest.disabled}
    />
  </>
);

FormikInputComponent.propTypes = {
  meta  : PropTypes.object,
  rest  : PropTypes.object,
  state : PropTypes.object
};

const FormikInput = withFormikField({
  Component: FormikInputComponent
});

export default FormikInput;
