import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import getFormFieldStateProps from './lib/get-form-field-state-props';
import withFormikField from './lib/with-formik-field';

import Select from '../../elements/Select';

const FormikSelectComponent = ({ state, meta, rest }) => (
  <Select
    {...rest}
    {...getFormFieldStateProps(state, meta, rest)}
  />
);

FormikSelectComponent.propTypes = {
  meta  : PropTypes.object,
  rest  : PropTypes.object,
  state : PropTypes.object
};

const FormikSelect = withFormikField({
  Component    : FormikSelectComponent,
  handleChange : (formik, props, selected) => {
    /** On simple Selector, set the value */
    if (!props.isMulti) {
      formik.setFieldValue(props.name, _.isNil(selected) ? null : selected.value);
      return;
    }
    /** On Multi selector must append value on original array */
    formik.setFieldValue(props.name, selected);
  },
  computeValue: (value, { options }) => (
    value && Array.isArray(options)
      ? options.find(opt => opt.value === value)
      : null
  )
});

export default FormikSelect;
