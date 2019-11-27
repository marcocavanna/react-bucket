import React from 'react';
import PropTypes from 'prop-types';

import { useFormikContext } from 'formik';

import getFormFieldStateProps from './lib/get-form-field-state-props';
import withFormikField from './lib/with-formik-field';

import {
  partitionFieldProps
} from '../../lib';

import Checkbox from '../../elements/Checkbox';
import Field from '../../elements/Field';
import Layout from '../Layout';
import FormikCheckbox from './FormikCheckbox';

const FormikRadio = (props) => {

  /** Get Specific Props */
  const {
    multiBooleanValue,
    columns,
    options,
    ...allRest
  } = props;

  /** Calc Column Width */
  const width = 12 / columns;

  /** Return different content using multiBooleanValue  */
  if (multiBooleanValue) {

    /** Get the formik context */
    const formik = useFormikContext();

    /** Partition Field Props */
    const [fieldProps, rest] = partitionFieldProps(allRest);

    /** Handler for Checked Event */
    const handleRadioChecked = (e, { name }) => {
      const optionsValue = options.reduce((acc, { value }) => {
        acc[value] = value === name;
        return acc;
      }, {});

      formik.setValues({
        ...formik.values,
        ...optionsValue
      });
    };

    /** Get Form Values from Formik Context */
    const { values } = formik;

    return (
      <Field
        {...fieldProps}
        form
        radio
        content={(
          <Layout fluid>
            <Layout.Row>
              {options.map(({ value, label }) => (
                <Layout.Column key={value} onTabletIs={width}>
                  <FormikCheckbox
                    {...rest}
                    radio
                    label={label}
                    name={value}
                    checked={!!values[value]}
                    onChecked={handleRadioChecked}
                  />
                </Layout.Column>
              ))}
            </Layout.Row>
          </Layout>
        )}
      />
    );
  }

  /** Else, return a formik HOC Component */
  return withFormikField({
    // eslint-disable-next-line react/prop-types
    Component: ({ state, meta, rest: rawRest }) => {
      /** Get field Props */
      const [fieldProps] = partitionFieldProps(rawRest);

      /** Get Handler */
      const {
        value: fieldValue,
        onChange,
        ...rest
      } = rawRest;

      return (
        <Field
          {...fieldProps}
          {...getFormFieldStateProps(state, meta, rawRest)}
          content={(
            <Layout fluid>
              <Layout.Row>
                {options.map(({ value, label }) => (
                  <Layout.Column key={value} onTabletIs={width}>
                    <Checkbox
                      {...rest}
                      radio
                      value={value}
                      label={label}
                      checked={fieldValue === value}
                      onChecked={onChange}
                    />
                  </Layout.Column>
                ))}
              </Layout.Row>
            </Layout>
          )}
        />
      );
    },
    handleChange: (formik, { name }, event, { value }) => {
      formik.setFieldValue(name, value);
    }
  })(allRest);

};

FormikRadio.propTypes = {
  /** Set the Number of Columns */
  columns: PropTypes.oneOf([1, 2, 3, 4, 6, 12]),

  /** Set the Field Label */
  label: PropTypes.string,

  /** A multi boolean value will set multiple key of the formik object */
  multiBooleanValue: PropTypes.bool,

  /** The Radio Options */
  options: PropTypes.arrayOf(PropTypes.shape({
    label : PropTypes.node,
    value : PropTypes.string
  }))
};

FormikRadio.defaultProps = {
  columns: 1
};

export default FormikRadio;
