import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import getFormFieldStateProps from './lib/get-form-field-state-props';
import withFormikField from './lib/with-formik-field';

import Select from '../../elements/Select';

const FormikSelectComponent = ({ state, meta, rest }) => (
  <Select
    {...rest}
    {...getFormFieldStateProps(state, meta)}
  />
);

FormikSelectComponent.propTypes = {
  meta  : PropTypes.object,
  rest  : PropTypes.object,
  state : PropTypes.object
};

const FormikSelect = withFormikField({
  Component    : FormikSelectComponent,
  handleChange : (formik, { name }, selected) => {
    formik.setFieldValue(name, _.isNil(selected) ? undefined : selected.value);
  },
  computeValue: (value, { options }) => (
    value && Array.isArray(options)
      ? options.find(opt => opt.value === value)
      : null
  )
});

export default FormikSelect;
