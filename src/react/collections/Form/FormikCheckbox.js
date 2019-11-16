import React from 'react';
import PropTypes from 'prop-types';

import getFormFieldStateProps from './lib/get-form-field-state-props';
import withFormikField from './lib/with-formik-field';

import Checkbox from '../../elements/Checkbox';

const FormikCheckboxComponent = ({ state, meta, rest: rawRest }) => {

  const {
    value,
    ...rest
  } = rawRest;

  return (
    <Checkbox
      {...rest}
      {...getFormFieldStateProps(state, meta)}
      defaultChecked={!!value}
    />
  );
};

FormikCheckboxComponent.propTypes = {
  meta  : PropTypes.object,
  rest  : PropTypes.object,
  state : PropTypes.object
};

const FormikCheckbox = withFormikField({
  Component    : FormikCheckboxComponent,
  handleChange : (formik, { name }, e, { checked }) => {
    formik.setFieldValue(name, checked);
  }
});

export default FormikCheckbox;
