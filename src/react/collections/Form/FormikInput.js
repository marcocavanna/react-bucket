import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Input from '../../elements/Input';

import withFormikField from './lib/with-formik-field';

const FormikInputComponent = ({ state, meta, rest }) => (
  <>
    <Input
      error={meta.touched && state.error}
      success={meta.touched && state.success}
      warning={meta.touched && state.warning}
      messages={state.hasMessages && meta.touched ? [state.message] : null}
      {...rest}
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
  Component    : FormikInputComponent,
  computeValue : value => (_.isNil(value) ? '' : value)
});

export default FormikInput;
