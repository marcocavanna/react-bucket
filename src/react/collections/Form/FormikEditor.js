import React from 'react';
import PropTypes from 'prop-types';

import Editor from '../../elements/Editor';

import withFormikField from './lib/with-formik-field';

const FormikEditorComponent = ({ state, meta, rest: rawRest }) => {

  /** Strip Value from Rest Props */
  const { value, ...rest } = rawRest;

  return (
    <Editor
      {...rest}
      defaultValue={value}
      error={meta.touched && state.error}
      success={meta.touched && state.success}
      warning={meta.touched && state.warning}
      messages={state.hasMessages && meta.touched ? [state.message] : null}
      disabled={state.isSubmitting || rest.disabled}
    />
  );
};

FormikEditorComponent.propTypes = {
  meta  : PropTypes.object,
  rest  : PropTypes.object,
  state : PropTypes.object
};

const FormikEditor = withFormikField({
  Component           : FormikEditorComponent,
  handleChange        : (formik, { name }, e, { htmlValue }) => {
    formik.setFieldValue(name, htmlValue);
  }
});

export default FormikEditor;
