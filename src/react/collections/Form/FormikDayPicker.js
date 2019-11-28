import React from 'react';
import PropTypes from 'prop-types';

import getFormFieldStateProps from './lib/get-form-field-state-props';
import withFormikField from './lib/with-formik-field';

import DayPicker from '../DayPicker';

const FormikDayPickerComponent = ({ state, meta, rest: rawRest }) => {

  /** Get Value from Raw Rest Props */
  const {
    value,
    onChange,
    ...rest
  } = rawRest;

  return (
    <DayPicker
      {...rest}
      {...getFormFieldStateProps(state, meta, rest)}
      date={value}
      onDayChange={onChange}
    />
  );
};

FormikDayPickerComponent.propTypes = {
  meta  : PropTypes.object,
  rest  : PropTypes.object,
  state : PropTypes.object
};

const FormikDayPicker = withFormikField({
  Component    : FormikDayPickerComponent,
  handleChange : (formik, { name }, nothing, { value }) => {
    formik.setFieldValue(name, value);
  }
});

export default FormikDayPicker;
