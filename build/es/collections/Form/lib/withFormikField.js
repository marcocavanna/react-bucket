'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var React = require('react');
var formik = require('formik');

/* --------
 * Formik Field Wrapper HOC
 * -------- */
function withFormikField(configuration) {
  /** Get field Configuration and apply defaults */
  var Component = configuration.Component,
    computeValue = configuration.computeValue,
    defaultProps = configuration.defaultProps,
    displayName = configuration.displayName,
    overridenOnChangeHandler = configuration.onChange,
    overrideProps = configuration.overrideProps,
    _a = configuration.setTouchedOnChange,
    defaultSetTouchedOnChange = _a === void 0 ? true : _a;
  /** Define the Component */
  var FormikField = function (props) {
    /** Get component Props */
    var _a = _tslib.__assign(
        _tslib.__assign(_tslib.__assign({}, overrideProps), props),
        defaultProps
      ),
      name = _a.name,
      validate = _a.validate,
      localSetTouchOnChange = _a.setTouchedOnChange,
      localOnChangeHandler = _a.onChange,
      localOnBlurHandler = _a.onBlur,
      _b = _a.getErrorOnSubmitted,
      localGetErrorOnSubmitted = _b === void 0 ? true : _b,
      _c = _a.getErrorOnTouched,
      localGetErrorOnTouched = _c === void 0 ? false : _c,
      componentRestProps = _tslib.__rest(_a, [
        'name',
        'validate',
        'setTouchedOnChange',
        'onChange',
        'onBlur',
        'getErrorOnSubmitted',
        'getErrorOnTouched',
      ]);
    /* --------
     * Init the Hook to use Formik
     * -------- */
    var formik$1 = formik.useFormikContext();
    /* --------
     * Lifecycle Events to Register formik Field
     * -------- */
    React.useEffect(
      function () {
        /** Register the new Field */
        formik$1.registerField(name, { validate: validate });
        /** Unregister form field on component unmount */
        return function () {
          formik$1.unregisterField(name);
        };
      },
      [
        formik$1,
        formik$1.registerField,
        formik$1.unregisterField,
        name,
        validate,
      ]
    );
    /* --------
     * Build Component Props
     * -------- */
    var _d = formik$1.getFieldProps(
        _tslib.__assign({ name: name }, componentRestProps)
      ),
      formikFieldName = _d.name,
      formikBlurHandler = _d.onBlur,
      formikChangeHandler = _d.onChange,
      value = _d.value,
      formikFieldRest = _tslib.__rest(_d, [
        'name',
        'onBlur',
        'onChange',
        'value',
      ]);
    /* --------
     * Meta Props Definition
     * -------- */
    var meta = formik$1.getFieldMeta(formikFieldName);
    /* --------
     * Field Handlers
     * -------- */
    var handleFieldChange = React.useCallback(
      function (event, componentPropsFromEvent) {
        var restArgs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          restArgs[_i - 2] = arguments[_i];
        }
        /** Check if field must be set as touched on change */
        if (
          (defaultSetTouchedOnChange || localSetTouchOnChange) &&
          !meta.touched
        ) {
          formik$1.setFieldTouched(formikFieldName, true, false);
        }
        /** Check which handler must be used */
        if (overridenOnChangeHandler) {
          overridenOnChangeHandler(
            formik$1,
            event,
            _tslib.__assign(
              _tslib.__assign(_tslib.__assign({}, formikFieldRest), {
                name: formikFieldName,
                value: value,
              }),
              componentPropsFromEvent
            ),
            meta
          );
        } else {
        /** Else, fire the original formik handler */
          formikChangeHandler(event);
        }
        /** Fire the Local onChange handler */
        if (localOnChangeHandler) {
          localOnChangeHandler.apply(
            void 0,
            _tslib.__spreadArrays([event, componentPropsFromEvent], restArgs)
          );
        }
      },
      [
        localSetTouchOnChange,
        meta,
        localOnChangeHandler,
        formik$1,
        formikFieldName,
        formikFieldRest,
        value,
        formikChangeHandler,
      ]
    );
    var handleFieldBlur = React.useCallback(
      function (event, componentPropsFromEven) {
        var restArgs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          restArgs[_i - 2] = arguments[_i];
        }
        /** Fire Formik original blur handler */
        formikBlurHandler(event);
        /** Set the field has touched */
        if (!meta.touched) {
          formik$1.setFieldTouched(formikFieldName, true, true);
        }
        /** Fire the local blur handler */
        if (localOnBlurHandler) {
          localOnBlurHandler.apply(
            void 0,
            _tslib.__spreadArrays([event, componentPropsFromEven], restArgs)
          );
        }
      },
      [
        formikBlurHandler,
        meta.touched,
        localOnBlurHandler,
        formik$1,
        formikFieldName,
      ]
    );
    /* --------
     * Check if Value must be computed
     * -------- */
    var fieldValue = React.useMemo(
      function () {
        if (computeValue) {
          return computeValue(
            value,
            _tslib.__assign(
              _tslib.__assign(_tslib.__assign({}, formikFieldRest), props),
              { name: formikFieldName }
            )
          );
        }
        return value;
      },
      [formikFieldName, formikFieldRest, props, value]
    );
    /** Check if must show error */
    var showError =
      (localGetErrorOnTouched && meta.touched) ||
      (localGetErrorOnSubmitted && formik$1.submitCount > 0);
    /* --------
     * Render the Component
     * -------- */
    return React.createElement(Component, {
      meta: meta,
      state: {
        danger: !!((showError && meta.error) || props.danger),
        isSubmitting: formik$1.isSubmitting,
        message: showError ? meta.error : undefined,
        success: props.success,
        warning: props.warning,
      },
      rest: _tslib.__assign(_tslib.__assign({}, props), {
        name: name,
        onBlur: handleFieldBlur,
        onChange: handleFieldChange,
        value: fieldValue,
      }),
    });
  };
  /** Define the component props */
  FormikField.displayName =
    displayName !== null && displayName !== void 0
      ? displayName
      : 'FormikField';
  return FormikField;
}

module.exports = withFormikField;
//# sourceMappingURL=withFormikField.js.map
