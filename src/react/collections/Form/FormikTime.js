import React from 'react';
import PropTypes from 'prop-types';

import { isValidString } from '@appbuckets/rabbit';

import Input from '../../elements/Input';

import withFormikField from './lib/with-formik-field';

const FormikInputComponent = ({ state, meta, rest }) => (
  <>
    <Input
      {...rest}
      type='time'
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
  Component: FormikInputComponent,

  handleChange: (formik, { name }, e, { value }) => {
    if (!isValidString(value)) {
      formik.setFieldValue(name, null);
    }

    const [hours, minutes] = value.split(':');

    formik.setFieldValue(name, (+hours * 3600000) + (+minutes * 60000));
  },

  computeValue: (value) => {
    if (typeof value !== 'number') {
      return '';
    }

    const minutes = (value % 3600000) / 60000;
    const hours = Math.trunc((value - minutes) / 3600000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
});

export default FormikInput;
