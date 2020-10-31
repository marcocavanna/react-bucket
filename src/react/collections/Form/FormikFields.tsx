import * as React from 'react';

import { Checkbox, CheckboxProps } from '../../elements/Checkbox';
import { DayPicker, DayPickerProps, ParsableDate } from '../../elements/DayPicker';
import { Input, InputProps } from '../../elements/Input';

import { SharedComponentStateProps } from '../../generic';

import withFormikField from './lib/withFormikField';
import { FormikFieldComponentRenderProps } from './lib/withFormikField.types';


/* --------
 * Internal Hooks
 * -------- */
function useFormikFieldState<P extends { [key: string]: any }>(
  props: React.PropsWithChildren<FormikFieldComponentRenderProps<P, any>>
) {
  return React.useMemo<Partial<SharedComponentStateProps> & { disabled: boolean }>(
    () => ({
      danger  : !!(props.meta.touched && props.state.danger) || !!(props.rest.danger),
      success : !!(props.meta.touched && props.state.success) || !!(props.rest.success),
      warning : !!(props.meta.touched && props.state.warning) || !!(props.rest.warning),
      disabled: !!(props.state.isSubmitting || props.rest.disabled)
    }),
    [
      props.meta.touched,
      props.state.danger,
      props.rest.danger,
      props.state.success,
      props.rest.success,
      props.state.warning,
      props.rest.warning,
      props.state.isSubmitting,
      props.rest.disabled
    ]
  );
}


/* --------
 * Checkbox Wrapped Component
 * -------- */
export const FormikCheckbox = withFormikField<CheckboxProps, boolean>({
  Component: function FormikCheckboxComponent(props) {
    const stateProps = useFormikFieldState(props);

    const {
      value,
      ...rest
    } = props.rest;

    return (
      <Checkbox
        {...rest}
        {...stateProps}
        hint={props.state.message}
        checked={!!value}
      />
    );
  },
  onChange : (formik, event, props) => {
    formik.setFieldValue(props.name, !!props.checked, true);
  }
});


/* --------
 * DayPicker Wrapped Component
 * -------- */
export const FormikDayPicker = withFormikField<DayPickerProps<ParsableDate>, number | null>({
  Component: function FormikDayPickerComponent(props) {
    const stateProps = useFormikFieldState(props);

    const {
      value,
      onChange,
      onDayChange: userDefinedDayChangeHandler,
      timestamp,
      ...rest
    } = props.rest;

    const handleDayChange = React.useCallback(
      (nothing: null, componentProps: DayPickerProps) => {
        onChange(nothing, componentProps);
        if (userDefinedDayChangeHandler) {
          userDefinedDayChangeHandler(nothing, componentProps);
        }
      },
      [ onChange, userDefinedDayChangeHandler ]
    );

    return (
      <DayPicker
        {...rest}
        {...stateProps}
        date={value}
        onDayChange={handleDayChange}
      />
    );
  },
  onChange : (formik, event, props) => {
    formik.setFieldValue(props.name, props.timestamp, true);
  }
});


/* --------
 * Input Wrapped Component
 * -------- */
export const FormikInput = withFormikField<InputProps, string | number>({
  Component         : function FormikInputComponent(props) {
    const stateProps = useFormikFieldState(props);
    return (
      <Input
        {...props.rest}
        {...stateProps}
        hint={props.state.message}
      />
    );
  },
  setTouchedOnChange: false
});


/* --------
 * Time Wrapped Input Component
 * -------- */
export const FormikTime = withFormikField<InputProps, number | null, string>({
  Component: function FormikTimeInputComponent(props) {
    const stateProps = useFormikFieldState(props);

    return (
      <Input
        {...props.rest}
        {...stateProps}
        hint={props.state.message}
        type={'time'}
      />
    );
  },

  onChange: ((formik, event, props) => {
    if (typeof props.value !== 'string' || !props.value.length) {
      formik.setFieldValue(props.name, null);
      return;
    }

    const [ hours, minutes ] = props.value.split(':');

    formik.setFieldValue(props.name, (+hours * 3600000) + (+minutes * 60000));
  }),

  computeValue: ((value) => {
    if (typeof value !== 'number') {
      return '';
    }

    const minutes = (value % 3600000) / 60000;
    const hours = Math.trunc((value - minutes) / 3600000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  })
});
