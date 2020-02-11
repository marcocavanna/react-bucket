import React from 'react';
import PropTypes from 'prop-types';

import { isObject } from '@appbuckets/rabbit';

import _ from 'lodash';

import getFormFieldStateProps from './lib/get-form-field-state-props';
import withFormikField from './lib/with-formik-field';

import Select from '../../elements/Select';


/** @deprecated */
const __deprecatedComputeOptionValue = value => (
  isObject(value)
    ? value._id || value.value
    : value
);


const computeOptionProp = (option, getterFn, fallbackField) => {
  /** If option is already a string, return as is */
  if (typeof option === 'string') {
    return option;
  }

  /** If option is not an object, return */
  if (!isObject(option)) {
    return undefined;
  }

  /** Check if Select has a custom getterFn function and use it */
  if (typeof getterFn === 'function') {
    return getterFn(option);
  }

  /**
   * Else, check if option is a valid Object and
   * try to return its value key.
   * Alternately, return the entire option
   */
  return option?.[fallbackField] ?? option;
};

const computeOptionValue = (option, props) => (
  computeOptionProp(option, props.getOptionValue, 'value')
);

const computeOptionLabel = (option, props) => (
  computeOptionProp(option, props.getOptionLabel, 'label')
);


const FormikSelectComponent = ({ state, meta, rest }) => (
  <Select
    defaultValue={rest.initialValue}
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

  computeInitialValue: true,

  /** Handle Change function will set Formik Props */
  handleChange: (formik, props, selected) => {

    /**
     * On single selector, the
     * select arg is a plain object
     * containing the selected item
     */
    if (!props.isMulti) {
      /** If selected is null, set value to null */
      if (selected === null) {
        formik.setFieldValue(props.name, null);
        return;
      }

      /** Try to Get the Select Value */
      const value = computeOptionValue(selected, props);

      /** Set the Formik Field Value */
      formik.setFieldValue(props.name, _.isNil(value) ? null : value);
      return;
    }

    /** On Multi selector must append value on original array */
    formik.setFieldValue(props.name, selected);

  },

  /** Compute Value function will get the selected items */
  computeValue: (option, { options, ...props }) => {

    /**
     * On single selector, the selected
     * props is a plain object
     */
    if (!props.isMulti) {

      /** Try to get the Value */
      const value = computeOptionValue(option, props);

      /**
       * To avoid error while searching the correct
       * selector options, check we have the selected value
       * and the options array to filter
       */
      if (!value || !Array.isArray(options)) {
        return null;
      }

      /**
       * Remap the options using the function to compute
       * value for each possibility and find the selected
       * one. Otherwhise return undefined
       */
      const foundedOption = options.find((choice) => {
        /** Compute Option Value */
        const choiceValue = computeOptionValue(choice, props);
        /** Compare with Selected */
        return choiceValue === value;
      });

      /** If a valid option has been found, return it */
      if (foundedOption) {
        return foundedOption;
      }

      /**
       * Else if the selector is in creatable mode,
       * build a new option to push into options array
       */
      if (props.creatable) {
        const newOption = {
          __isNew__ : true,
          label     : computeOptionLabel(option, props),
          value
        };

        /** Place the new option on first position */
        options.unshift(newOption);

        return newOption;
      }

      /**
<<<<<<< HEAD
       * Else, if the selector as an async
       * selector and option is an object
       * push the option in the array
       * and set the value
       */
      if (props.isAsync && isObject(option)) {
        /** Place the new Option */
        options.unshift(option);
        return value;
      }

      /**
       * Returning undefined will not erase the value
       * and it will be checked on next round
       */
      return undefined;
    }

    /** To continue with isMulti props, must assert values is an Array */
    if (!Array.isArray(option)) {
      return [];
    }

    /**
     * If the selector is a Multiple Choice selector
     * and the selected values is an array, remap each
     * selected values computing choice value
     */
    const selectedValues = option.map(__deprecatedComputeOptionValue);

    /** On Multiselector must build an array of value? */
    const selected = Array.isArray(options)
      ? options.filter(choice => selectedValues.includes(choice.value))
      : [];

    return selected;
  }
});

export default FormikSelect;
