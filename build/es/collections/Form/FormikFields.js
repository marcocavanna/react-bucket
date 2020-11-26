'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var Checkbox = require('../../elements/Checkbox/Checkbox.js');
var Input = require('../../elements/Input/Input.js');
var DayPicker = require('../../elements/DayPicker/DayPicker.js');
var Select = require('../../elements/Select/Select.js');
var SelectMulti = require('../../elements/Select/SelectMulti.js');
var withFormikField = require('./lib/withFormikField.js');

/* --------
 * Internal Hooks
 * -------- */
function useFormikFieldState(props) {
  return React.useMemo(
    function () {
      return {
        danger:
          !!(props.meta.touched && props.state.danger) || !!props.rest.danger,
        success:
          !!(props.meta.touched && props.state.success) || !!props.rest.success,
        warning:
          !!(props.meta.touched && props.state.warning) || !!props.rest.warning,
        disabled: !!(props.state.isSubmitting || props.rest.disabled),
      };
    },
    [
      props.meta.touched,
      props.state.danger,
      props.rest.danger,
      props.state.success,
      props.rest.success,
      props.state.warning,
      props.rest.warning,
      props.state.isSubmitting,
      props.rest.disabled,
    ]
  );
}
/* --------
 * Checkbox Wrapped Component
 * -------- */
var FormikCheckbox = withFormikField({
  Component: function FormikCheckboxComponent(props) {
    var stateProps = useFormikFieldState(props);
    var _a = props.rest,
      value = _a.value,
      rest = _tslib.__rest(_a, ['value']);
    return React.createElement(
      Checkbox,
      _tslib.__assign({}, rest, stateProps, {
        hint: props.state.message,
        checked: !!value,
      })
    );
  },
  onChange: function (formik, event, props) {
    formik.setFieldValue(props.name, !!props.checked, true);
  },
});
/* --------
 * DayPicker Wrapped Component
 * -------- */
var FormikDayPicker = withFormikField({
  Component: function FormikDayPickerComponent(props) {
    var stateProps = useFormikFieldState(props);
    var _a = props.rest,
      value = _a.value,
      onChange = _a.onChange,
      userDefinedDayChangeHandler = _a.onDayChange,
      timestamp = _a.timestamp,
      rest = _tslib.__rest(_a, [
        'value',
        'onChange',
        'onDayChange',
        'timestamp',
      ]);
    var handleDayChange = React.useCallback(
      function (nothing, componentProps) {
        onChange(nothing, componentProps);
        if (userDefinedDayChangeHandler) {
          userDefinedDayChangeHandler(nothing, componentProps);
        }
      },
      [onChange, userDefinedDayChangeHandler]
    );
    return React.createElement(
      DayPicker,
      _tslib.__assign({}, rest, stateProps, {
        date: value,
        onDayChange: handleDayChange,
      })
    );
  },
  onChange: function (formik, event, props) {
    formik.setFieldValue(props.name, props.timestamp, true);
  },
});
/* --------
 * Input Wrapped Component
 * -------- */
var FormikInput = withFormikField({
  Component: function FormikInputComponent(props) {
    var stateProps = useFormikFieldState(props);
    return React.createElement(
      Input,
      _tslib.__assign({}, props.rest, stateProps, { hint: props.state.message })
    );
  },
  setTouchedOnChange: false,
});
/* --------
 * Time Wrapped Input Component
 * -------- */
var FormikTime = withFormikField({
  Component: function FormikTimeInputComponent(props) {
    var stateProps = useFormikFieldState(props);
    return React.createElement(
      Input,
      _tslib.__assign({}, props.rest, stateProps, {
        hint: props.state.message,
        type: 'time',
      })
    );
  },
  onChange: function (formik, event, props) {
    if (typeof props.value !== 'string' || !props.value.length) {
      formik.setFieldValue(props.name, null);
      return;
    }
    var _a = props.value.split(':'),
      hours = _a[0],
      minutes = _a[1];
    formik.setFieldValue(props.name, +hours * 3600000 + +minutes * 60000);
  },
  computeValue: function (value) {
    if (typeof value !== 'number') {
      return '';
    }
    var minutes = (value % 3600000) / 60000;
    var hours = Math.trunc((value - minutes) / 3600000);
    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0')
    );
  },
});
/* --------
 * Wrapped Select Component
 * -------- */
var FormikSelect = function (wrapperProps) {
  return withFormikField({
    Component: function FormikSelectComponent(props) {
      var stateProps = useFormikFieldState(props);
      return React.createElement(
        Select,
        _tslib.__assign({}, props.rest, stateProps, {
          hint: props.state.message,
        })
      );
    },
    onChange: function (formik, event, props) {
      formik.setFieldValue(props.name, props.value);
    },
    computeValue: function (value, props) {
      var _a;
      if (!value) {
        return null;
      }
      return (_a = props.options.find(function (option) {
        var _a;
        /** Get the Option Value */
        var optionValue = props.getOptionValue
          ? props.getOptionValue(option)
          : (_a =
              option === null || option === void 0 ? void 0 : option.value) !==
              null && _a !== void 0
          ? _a
          : option;
        /** Compare Option Value with Selected One */
        if (
          typeof value === 'object' &&
          value !== null &&
          props.getOptionValue
        ) {
          return props.getOptionValue(value) === optionValue;
        }
        return value === optionValue;
      })) !== null && _a !== void 0
        ? _a
        : null;
    },
  })(wrapperProps);
};
var FormikMultiSelect = function (wrapperProps) {
  return withFormikField({
    Component: function FormikSelectComponent(props) {
      var stateProps = useFormikFieldState(props);
      return React.createElement(
        SelectMulti,
        _tslib.__assign({}, props.rest, stateProps, {
          hint: props.state.message,
        })
      );
    },
    onChange: function (formik, event, props) {
      formik.setFieldValue(props.name, props.value);
    },
    computeValue: function (values, props) {
      /** Transform Value using getOptionValue props function if exists */
      if (!Array.isArray(values)) {
        return [];
      }
      return props.options.filter(function (option) {
        var _a;
        /** Get the Option Value */
        var optionValue = props.getOptionValue
          ? props.getOptionValue(option)
          : (_a =
              option === null || option === void 0 ? void 0 : option.value) !==
              null && _a !== void 0
          ? _a
          : option;
        /** If value is included in values then return true */
        return !!values.find(function (value) {
          if (
            typeof value === 'object' &&
            value !== null &&
            props.getOptionValue
          ) {
            return props.getOptionValue(value) === optionValue;
          }
          return value === optionValue;
        });
      });
    },
  })(wrapperProps);
};

exports.FormikCheckbox = FormikCheckbox;
exports.FormikDayPicker = FormikDayPicker;
exports.FormikInput = FormikInput;
exports.FormikMultiSelect = FormikMultiSelect;
exports.FormikSelect = FormikSelect;
exports.FormikTime = FormikTime;
//# sourceMappingURL=FormikFields.js.map
