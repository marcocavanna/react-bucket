import React from 'react';
import PropTypes from 'prop-types';

import { isObject } from '@appbuckets/rabbit';

import _ from 'lodash';

import getFormFieldStateProps from './lib/get-form-field-state-props';
import withFormikField from './lib/with-formik-field';

import Select from '../../elements/Select';

const computeElementValue = value => (
  isObject(value)
    ? value._id || value.value
    : value
);

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
  computeValue: (value, { options, ...props }) => {
    /** On Simple Selector, try to compute the value */
    if (!props.isMulti) {
      return (
        value && Array.isArray(options)
          ? options.find(opt => opt.value === value)
          : null
      );
    }

    const selectedValues = Array.isArray(value) ? value.map(computeElementValue) : [];

    /** On Multiselector must build an array of value? */
    const selected = Array.isArray(value) && Array.isArray(options)
      ? options.filter(option => selectedValues.includes(option.value))
      : [];

    return selected;
  }
});

export default FormikSelect;
