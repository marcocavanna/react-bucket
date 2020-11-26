'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
require('../../elements/Button/ButtonGroup.js');
var Button = require('../../elements/Button/Button.js');
var Form = require('./Form.js');
var formik = require('formik');

/* --------
 * Render the Formik Inner Actions
 * -------- */
function FormFormikActions(props) {
  var ActionWrapper = props.formActionWrapper,
    submitButton = props.submitButton,
    cancelButton = props.cancelButton,
    onCancel = props.onCancel,
    formikBag = props.formikBag;
  /* --------
   * Build Memoized Components
   * -------- */
  var submitButtonElement = React.useMemo(
    function () {
      return Button.create(submitButton, {
        autoGenerateKey: false,
        defaultProps: {
          className: 'submit',
          primary: true,
          loading: formikBag.isSubmitting,
        },
        overrideProps: {
          disabled: formikBag.isSubmitting,
          type: 'submit',
        },
      });
    },
    [submitButton, formikBag.isSubmitting]
  );
  var cancelButtonElement = React.useMemo(
    function () {
      return Button.create(cancelButton, {
        autoGenerateKey: false,
        defaultProps: {
          className: 'cancel',
        },
        overrideProps: function (originalProps) {
          return {
            disabled: formikBag.isSubmitting,
            type: 'button',
            onClick: function (e, buttonProps) {
              /** Call Initial onClick handler */
              if (originalProps.onClick) {
                originalProps.onClick(e, buttonProps);
              }
              /** Call the onCancel form Handler */
              if (onCancel) {
                onCancel(e, buttonProps, formikBag);
              }
            },
          };
        },
      });
    },
    [cancelButton, onCancel, formikBag.isSubmitting]
  );
  /** Case of no Action Wrapper, return an empty component */
  if (!ActionWrapper) {
    return null;
  }
  return React.createElement(
    ActionWrapper,
    { className: 'form-actions' },
    cancelButtonElement,
    submitButtonElement
  );
}
/* --------
 * Render the Formik Inner Content
 * -------- */
function FormFormikContent(props) {
  var ContentWrapper = props.formContentWrapper,
    children = props.children;
  if (!ContentWrapper) {
    return null;
  }
  return React.createElement(
    ContentWrapper,
    { className: 'form-content' },
    children
  );
}
/* --------
 * Render the Form Formik Outer Wrapper
 * -------- */
function FormFormik(props) {
  var _this = this;
  var /** Strict FormFormik Props */
    children = props.children,
    cancelButton = props.cancelButton,
    disabled = props.disabled,
    submitButton = props.submitButton,
    ActionWrapper = props.formActionWrapper,
    ContentWrapper = props.formContentWrapper,
    onCancel = props.onCancel,
    onSubmit = props.onSubmit,
    onSubmitCompleted = props.onSubmitCompleted,
    onSubmitError = props.onSubmitError,
    resetOnCancel = props.resetOnCancel,
    /** All other formik props */
    formikProps = _tslib.__rest(props, [
      'children',
      'cancelButton',
      'disabled',
      'submitButton',
      'formActionWrapper',
      'formContentWrapper',
      'onCancel',
      'onSubmit',
      'onSubmitCompleted',
      'onSubmitError',
      'resetOnCancel',
    ]);
  /* --------
   * Component Handlers
   * -------- */
  var handleFormSubmit = React.useCallback(function (values, helpers) {
    return _tslib.__awaiter(_this, void 0, void 0, function () {
      var result, _a, error_1;
      return _tslib.__generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 4, , 5]);
            if (!(typeof onSubmit === 'function')) return [3 /*break*/, 2];
            return [4 /*yield*/, onSubmit(values, helpers)];
          case 1:
            _a = _b.sent();
            return [3 /*break*/, 3];
          case 2:
            _a = undefined;
            _b.label = 3;
          case 3:
            result = _a;
            helpers.setSubmitting(false);
            if (onSubmitCompleted) {
              onSubmitCompleted(result, values, helpers);
            }
            return [3 /*break*/, 5];
          case 4:
            error_1 = _b.sent();
            helpers.setSubmitting(false);
            /** Call the error handler */
            if (onSubmitError) {
              onSubmitError(error_1, values, helpers);
            }
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  var handleFormikCancel = React.useCallback(
    function (e, buttonProps, formikBag) {
      /** Check if must reset form on cancel press */
      if (resetOnCancel) {
        formikBag.resetForm();
      }
      /** Call user defined handlers */
      if (onCancel) {
        onCancel(formikBag.values, {
          setStatus: formikBag.setStatus,
          setErrors: formikBag.setErrors,
          setSubmitting: formikBag.setSubmitting,
          setTouched: formikBag.setTouched,
          setValues: formikBag.setValues,
          setFieldError: formikBag.setFieldError,
          setFieldTouched: formikBag.setFieldTouched,
          setFieldValue: formikBag.setFieldValue,
          validateField: formikBag.validateField,
          validateForm: formikBag.validateForm,
          resetForm: formikBag.resetForm,
          submitForm: formikBag.submitForm,
          setFormikState: formikBag.setFormikState,
        });
      }
    },
    [onCancel]
  );
  /* --------
   * Return the Form
   * -------- */
  return React.createElement(
    formik.Formik,
    _tslib.__assign({}, formikProps, { onSubmit: handleFormSubmit }),
    function (formikBag) {
      return React.createElement(
        Form,
        { onSubmit: formikBag.handleSubmit },
        React.createElement(
          FormFormikContent,
          _tslib.__assign({}, props, {
            onCancel: undefined,
            formikBag: formikBag,
          })
        ),
        React.createElement(
          FormFormikActions,
          _tslib.__assign({}, props, {
            onCancel: handleFormikCancel,
            formikBag: formikBag,
          })
        )
      );
    }
  );
}
FormFormik.defaultProps = {
  formActionWrapper: 'div',
  formContentWrapper: 'div',
};

module.exports = FormFormik;
//# sourceMappingURL=FormFormik.js.map
