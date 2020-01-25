import React from 'react';
import PropTypes from 'prop-types';

import { isObject } from '@appbuckets/rabbit';

import _ from 'lodash';

import getFormFieldStateProps from './lib/get-form-field-state-props';
import withFormikField from './lib/with-formik-field';

import Select from '../../elements/Select';

/** @deprecated */
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
  Component: FormikSelectComponent,

  /** Handle Change function will set Formik Props */
  handleChange: (formik, props, selected) => {

    /**
     * On single selector, the
     * select arg is a plain object
     * containing the selected item
     */
    if (!props.isMulti) {
      /** Try to Get the Select Value */
      const value = typeof props.getOptionValue === 'function'
        ? props.getOptionValue(selected)
        : selected?.value ?? selected;

      /** Set the Formik Field Value */
      formik.setFieldValue(props.name, _.isNil(value) ? null : value);
      return;
    }

    /** On Multi selector must append value on original array */
    formik.setFieldValue(props.name, selected);

  },

  /** Compute Value function will get the selected items */
  computeValue: (value, { options, ...props }) => {

    /**
     * On single selector, the selected
     * props is a plain object
     */
    if (!props.isMulti) {
      /** Try to get the Value */
      const selectedValue = isObject(value)
        ? typeof props.getOptionValue === 'function'
          ? props.getOptionValue(value)
          : value.value
        : value;

      /** If no value, or options is not an array, return null */
      if (!value || !Array.isArray(options)) {
        return null;
      }

      /** Find correct option */
      return options.find((option) => {
        /** Compute Option Value */
        const optionValue = typeof props.getOptionValue === 'function'
          ? props.getOptionValue(option)
          : isObject(option)
            ? option.value
            : option;

        /** Compare with Selected */
        return optionValue === selectedValue;
      });

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
