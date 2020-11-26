'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var splitFieldProps = require('../../lib/splitFieldProps.js');
var useAutoControlledValue = require('../../hooks/useAutoControlledValue.js');
var Field = require('../Field/Field.js');
var ReactSelect = require('react-select');
var CreatableReactSelect = require('react-select/creatable');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);
var ReactSelect__default = /*#__PURE__*/ _interopDefaultLegacy(ReactSelect);
var CreatableReactSelect__default = /*#__PURE__*/ _interopDefaultLegacy(
  CreatableReactSelect
);

/* --------
 * Component Render
 * -------- */
var SelectRender = function (props, ref) {
  /** Split props from className */
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    /** Strict Select Component Props */
    creatable = _b.creatable,
    userDefinedGetOptionValue = _b.getOptionValue,
    loading = _b.loading,
    userDefinedTabIndex = _b.tabIndex,
    /** Select Event Handler */
    userDefinedOnBlur = _b.onBlur,
    userDefinedOnChange = _b.onChange,
    userDefinedOnFocus = _b.onFocus,
    userDefinedOnInputChange = _b.onInputChange,
    userDefinedOnMenuClose = _b.onMenuClose,
    userDefinedOnMenuOpen = _b.onMenuOpen,
    userDefinedOnMenuScrollToBottom = _b.onMenuScrollToBottom,
    userDefinedOnMenuScrollToTop = _b.onMenuScrollToTop,
    /** React Select Props */
    userDefinedInputValue = _b.inputValue,
    userDefinedDefaultInputValue = _b.defaultInputValue,
    userDefinedValue = _b.value,
    userDefinedDefaultValue = _b.defaultValue,
    /** All other props */
    rawRest = _tslib.__rest(_b, [
      'creatable',
      'getOptionValue',
      'loading',
      'tabIndex',
      'onBlur',
      'onChange',
      'onFocus',
      'onInputChange',
      'onMenuClose',
      'onMenuOpen',
      'onMenuScrollToBottom',
      'onMenuScrollToTop',
      'inputValue',
      'defaultInputValue',
      'value',
      'defaultValue',
    ]);
  // ----
  // Split Props
  // ----
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClasses = _c[0],
    compoundProps = _c[1];
  var _d = splitFieldProps(compoundProps),
    fieldProps = _d[0],
    rest = _d[1];
  // ----
  // Define Internal State and Variables
  // ----
  var _e = useAutoControlledValue.useAutoControlledValue('', {
      prop: userDefinedInputValue,
      defaultProp: userDefinedDefaultInputValue,
    }),
    inputValue = _e[0],
    trySetInputValue = _e[1];
  var _f = useAutoControlledValue.useAutoControlledValue(null, {
      prop: userDefinedValue,
      defaultProp: userDefinedDefaultValue,
    }),
    value = _f[0],
    trySetValue = _f[1];
  var fieldRef = React.useRef(null);
  var selectRef = React.useRef(null);
  React.useLayoutEffect(
    function () {
      if (typeof ref === 'function') {
        ref(selectRef.current);
      } else if (ref) {
        ref.current = selectRef.current;
      }
    },
    [ref]
  );
  // ----
  // Define the Element and its computed props
  // ----
  var ElementType = creatable
    ? CreatableReactSelect__default['default']
    : ReactSelect__default['default'];
  var tabIndex = React.useMemo(
    function () {
      if (fieldProps.disabled || fieldProps.readOnly) {
        return '-1';
      }
      if (userDefinedTabIndex !== undefined && userDefinedTabIndex !== null) {
        return userDefinedTabIndex.toString();
      }
      return undefined;
    },
    [fieldProps.disabled, fieldProps.readOnly, userDefinedTabIndex]
  );
  var classes = clsx__default['default'](
    {
      required: fieldProps.required,
      'read-only': fieldProps.readOnly,
      disabled: fieldProps.disabled,
    },
    'react-select',
    stateClasses,
    className
  );
  // ----
  // Get the Current Select Value using its ref
  // ----
  var getOptionValue = React.useCallback(
    function (option) {
      var _a;
      /** If function has not be defined, return as is */
      if (!userDefinedGetOptionValue) {
        return (_a =
          option === null || option === void 0 ? void 0 : option.value) !==
          null && _a !== void 0
          ? _a
          : '';
      }
      var optionValue = userDefinedGetOptionValue(option);
      if (optionValue === undefined || optionValue === null) {
        return '';
      }
      if (typeof optionValue !== 'string') {
        return optionValue.toString();
      }
      return optionValue;
    },
    [userDefinedGetOptionValue]
  );
  var getSelectedValue = function () {
    var _a;
    /** Get the Select State */
    var state = ((_a = selectRef.current) !== null && _a !== void 0 ? _a : {})
      .state;
    if (!state) {
      return props.isMulti ? [] : null;
    }
    var selectedValue = state.value;
    if (props.isMulti) {
      return selectedValue !== null && selectedValue !== void 0
        ? selectedValue
        : [];
    }
    return selectedValue !== null && selectedValue !== void 0
      ? selectedValue
      : null;
  };
  // ----
  // Component Handlers
  // ----
  var handleSelectBlur = function (e) {
    var _a;
    /** Abort if Disabled or ReadOnly */
    if (fieldProps.disabled || fieldProps.readOnly) {
      return;
    }
    /** Remove focused class from field */
    (_a = fieldRef.current) === null || _a === void 0
      ? void 0
      : _a.classList.remove('focused');
    /** Get the selected value */
    if (userDefinedOnBlur) {
      userDefinedOnBlur(
        e,
        _tslib.__assign(_tslib.__assign({}, props), {
          inputValue: inputValue,
          value: getSelectedValue(),
          action: null,
        })
      );
    }
  };
  var handleSelectChange = function (selectedValue, action) {
    var _a, _b;
    /** Set field as Dirty */
    (_a = fieldRef.current) === null || _a === void 0
      ? void 0
      : _a.classList.add('dirty');
    if (userDefinedOnChange) {
      userDefinedOnChange(
        null,
        _tslib.__assign(_tslib.__assign({}, props), {
          action: action,
          inputValue: inputValue,
          value:
            (_b = selectedValue) !== null && _b !== void 0
              ? _b
              : props.isMulti
              ? []
              : null,
        })
      );
    }
    trySetValue(selectedValue);
  };
  var handleSelectFocus = function (e) {
    var _a, _b;
    /** Abort if Disabled or ReadOnly */
    if (fieldProps.disabled || fieldProps.readOnly) {
      return;
    }
    /** Remove focused class from field */
    (_a = fieldRef.current) === null || _a === void 0
      ? void 0
      : _a.classList.add('focused');
    (_b = fieldRef.current) === null || _b === void 0
      ? void 0
      : _b.classList.add('touched');
    /** Get the selected value */
    if (userDefinedOnFocus) {
      userDefinedOnFocus(
        e,
        _tslib.__assign(_tslib.__assign({}, props), {
          inputValue: inputValue,
          value: getSelectedValue(),
          action: null,
        })
      );
    }
  };
  var handleInputChange = function (newInputValue) {
    if (userDefinedOnInputChange) {
      userDefinedOnInputChange(
        null,
        _tslib.__assign(_tslib.__assign({}, props), {
          inputValue: newInputValue,
          value: getSelectedValue(),
          action: null,
        })
      );
    }
    trySetInputValue(newInputValue);
  };
  var handleMenuOpen = function () {
    if (userDefinedOnMenuOpen) {
      userDefinedOnMenuOpen(
        null,
        _tslib.__assign(_tslib.__assign({}, props), {
          inputValue: inputValue,
          value: getSelectedValue(),
          action: null,
        })
      );
    }
  };
  var handleMenuClose = function () {
    if (userDefinedOnMenuClose) {
      userDefinedOnMenuClose(
        null,
        _tslib.__assign(_tslib.__assign({}, props), {
          inputValue: inputValue,
          value: getSelectedValue(),
          action: null,
        })
      );
    }
  };
  var handleMenuScrollToBottom = function (e) {
    if (userDefinedOnMenuScrollToBottom) {
      userDefinedOnMenuScrollToBottom(
        e,
        _tslib.__assign(_tslib.__assign({}, props), {
          inputValue: inputValue,
          value: getSelectedValue(),
          action: null,
        })
      );
    }
  };
  var handleMenuScrollToTop = function (e) {
    if (userDefinedOnMenuScrollToTop) {
      userDefinedOnMenuScrollToTop(
        e,
        _tslib.__assign(_tslib.__assign({}, props), {
          inputValue: inputValue,
          value: getSelectedValue(),
          action: null,
        })
      );
    }
  };
  // ----
  // Render the Component
  // ----
  return React.createElement(
    Field,
    _tslib.__assign({ ref: fieldRef }, fieldProps, {
      appearance: rawRest.appearance,
      danger: rawRest.danger,
      info: rawRest.info,
      primary: rawRest.primary,
      secondary: rawRest.secondary,
      success: rawRest.success,
      warning: rawRest.warning,
      contentType: 'select input',
    }),
    React.createElement(
      ElementType,
      _tslib.__assign({}, rest, {
        ref: ref,
        className: classes,
        classNamePrefix: ' ',
        getOptionValue: getOptionValue,
        isDisabled: fieldProps.disabled,
        isLoading: loading,
        tabIndex: tabIndex,
        inputValue: inputValue,
        value: value,
        onBlur: handleSelectBlur,
        onChange: handleSelectChange,
        onFocus: handleSelectFocus,
        onMenuClose: handleMenuClose,
        onMenuOpen: handleMenuOpen,
        onMenuScrollToBottom: handleMenuScrollToBottom,
        onMenuScrollToTop: handleMenuScrollToTop,
        onInputChange: handleInputChange,
      })
    )
  );
};
var Select = React.forwardRef(SelectRender);
Select.displayName = 'Select';
Select.defaultProps = {};
Select.create = reactUiCore.createShorthandFactory(Select, function (options) {
  return {
    options: options,
  };
});

module.exports = Select;
//# sourceMappingURL=Select.js.map
