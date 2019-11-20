/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import { isObject } from '@appbuckets/rabbit';

import { useFormikContext } from 'formik';

const withFormikField = ({
  Component,
  computeValue = null,
  handleChange  : handleChangeOverwritten,
  touchOnChange = true
}) => (props) => {

  /** Get Field Props */
  const {
    name,
    validate,
    ...rest
  } = props;

  /** Get the Formik Context */
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

  /** Get field props from formik context */
  const {
    name: fieldName,
    onBlur: handleBlur,
    onChange: originalOnChange,
    value,
    ...fieldRest
  } = formik.getFieldProps({ name, ...rest });

  /** Get meta props */
  const meta = formik.getFieldMeta(name);

  /** Extend the origianl change props to append an isChanged meta */
  const handleChange = (...args) => {
    /** Set Touched, if must */
    if (touchOnChange) {
      formik.setFieldTouched(fieldName, true, false);
    }
    /** Fire original function or the Overwritten */
    if (typeof handleChangeOverwritten === 'function') {
      handleChangeOverwritten(formik, { ...fieldRest, ...rest, name: fieldName, value }, ...args);
    }
    else {
      originalOnChange(...args);
    }
  };

  /** Get Properties from meta */
  const {
    error,
    message,
    success,
    warning
  } = isObject(meta.error) ? meta.error : {};

  /** Get the Form State */
  const { isSubmitting } = formik;

  /** Render the component passing the props */
  return (
    <Component
      state={{
        hasMessages: error || success || warning,
        error,
        message,
        success,
        warning,
        isSubmitting
      }}
      meta={meta}
      rest={{
        ...fieldRest,
        ...rest,
        name,
        onBlur   : handleBlur,
        onChange : handleChange,
        value    : typeof computeValue === 'function'
          ? computeValue(value, { ...fieldRest, ...rest, name })
          : value
      }}
    />
  );

};

export default withFormikField;
