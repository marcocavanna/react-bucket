import React from 'react';
import PropTypes from 'prop-types';

import { isObject } from '@appbuckets/rabbit';

import _ from 'lodash';

import getFormFieldStateProps from './lib/get-form-field-state-props';
import withFormikField from './lib/with-formik-field';

import Place from '../../elements/Place';

const FormikPlaceComponent = ({ state, meta, rest: rawRest }) => {
  const { value, ...rest } = rawRest;

  return (
    <Place
      {...rest}
      {...getFormFieldStateProps(state, meta, rest)}
    />
  );
};

FormikPlaceComponent.propTypes = {
  meta  : PropTypes.object,
  rest  : PropTypes.object,
  state : PropTypes.object
};

const FormikPlace = withFormikField({
  Component    : FormikPlaceComponent,
  handleChange : (formik, props, selected) => {
    formik.setFieldValue(props.name, selected);
  }
});

export default FormikPlace;
