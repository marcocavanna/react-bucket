/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import _ from 'lodash';

import { isObject } from '@appbuckets/rabbit';

import { useFormikContext } from 'formik';

const withFormikField = ({
  Component,
  computeValue = null,
  handleChange  : handleChangeOverwritten,
  touchOnChange = true,
  computeInitialValue = false
}) => (props) => {

  /** Get Field Props */
  const {
    name,
    validate,
    onChange: localOnFieldChange,
    onBlur: localOnFieldBlur,
    ...rest
  } = props;


  /* --------
   * Register the Field
   * in Parent Formik Form
   * -------- */
  const formik = useFormikContext();

  /** Get utils formik function */
  const { registerField, unregisterField } = formik;

  /** Add an Hook to register the field on component mount */
  useEffect(() => {
    /** On Component Mount, must register the field */
    registerField(name, { validate });
    /** Return the CleanUp method on Component unmount */
    return () => unregisterField(name);
  },
  /** Run the effect only on certain changes */
  [registerField, unregisterField, name, validate]);


  /* --------
   * Build Component Props
   * -------- */
  const {
    name: fieldName,
    onBlur: originalOnBlur,
    onChange: originalOnChange,
    value,
    ...fieldRest
  } = formik.getFieldProps({ name, ...rest });

  /** Extend the original change props to append an isChanged meta */
  const handleChange = (...args) => {
    /** Set Touched, if must */
    if (touchOnChange) {
      formik.setFieldTouched(fieldName, true, false);
    }
    /** Fire original function or the Overwritten */
    if (typeof handleChangeOverwritten === 'function') {
      handleChangeOverwritten(formik, { ...fieldRest, ...rest, name: fieldName, value }, ...args);
    }
    /** On Currency Input must set manually the number value */
    else if (rest.currency) {
      /** Get the value */
      const { value: numberValue } = args[1];
      formik.setFieldValue(fieldName, numberValue);
    }
    else {
      originalOnChange(...args);
    }
    /** Fire the Local on Field Change, if Exists */
    if (typeof localOnFieldChange === 'function') {
      localOnFieldChange(...args);
    }
  };

  /** Extend the original blur props to execute the localOnFieldBlur */
  const handleBlur = (...args) => {
    if (typeof localOnFieldBlur === 'function') {
      localOnFieldBlur(...args);
    }

    originalOnBlur(...args);
  };

  /** Get meta props */
  const meta = formik.getFieldMeta(name);

  /**
   * If field has not been touched and has an
   * initial value and this value is different
   * from 'value', set the initial value
   */
  if (!meta.touched
    && !_.isNil(meta.initialValue)
    && typeof computeValue === 'function'
    && computeInitialValue) {

    const initialValue = computeValue(
      meta.initialValue,
      { ...fieldRest, ...rest, name: fieldName, value: meta.initialValue }
    );

    /** Set initial value for this field */
    formik.setFieldTouched(fieldName, true, false);
    formik.setFieldValue(fieldName, initialValue);
  }

  /** Get Properties from meta */
  const {
    error,
    message,
    success,
    warning
  } = isObject(meta.error) ? meta.error : {};

  /** Get the Form State */
  const { isSubmitting } = formik;

  /** Compute the Field Value */
  const fieldValue = typeof computeValue === 'function'
    ? computeValue(value, { ...fieldRest, ...rest, name })
    : value;


  /* --------
   * Component Render
   * -------- */
  return (
    <Component
      state={{
        hasMessages : error || success || warning || rest.error || rest.success || rest.warning,
        error       : error || rest.error,
        message     : message || rest.messages,
        success     : success || rest.success,
        warning     : warning || rest.warning,
        isSubmitting
      }}
      meta={meta}
      rest={{
        ...fieldRest,
        ...rest,
        name,
        onBlur   : handleBlur,
        onChange : handleChange,
        value    : fieldValue
      }}
    />
  );

};

export default withFormikField;
