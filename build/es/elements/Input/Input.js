'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var useAutoControlledValue = require('../../hooks/useAutoControlledValue.js');
var useTabIndex = require('../../hooks/useTabIndex.js');
var Field = require('../Field/Field.js');
var ReactInputMask = require('react-input-mask');
var TextareaAutosize = require('react-textarea-autosize');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);
var ReactInputMask__default = /*#__PURE__*/ _interopDefaultLegacy(
  ReactInputMask
);
var TextareaAutosize__default = /*#__PURE__*/ _interopDefaultLegacy(
  TextareaAutosize
);

/* --------
 * Component Render
 * -------- */
var Input = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    /** Strict Input Props */
    clearable = _b.clearable,
    currency = _b.currency,
    masked = _b.masked,
    textarea = _b.textarea,
    type = _b.type,
    userDefinedTabIndex = _b.tabIndex,
    selectAllOnClick = _b.selectAllOnClick,
    userDefinedValue = _b.value,
    userDefinedDefaultValue = _b.defaultValue,
    textareaProps = _b.textareaProps,
    /** Overridden Input Handlers */
    userDefinedOnClick = _b.onClick,
    userDefinedOnClear = _b.onClear,
    userDefinedOnChange = _b.onChange,
    userDefinedOnBlur = _b.onBlur,
    userDefinedOnFocus = _b.onFocus,
    /** Shared Input/Field Props */
    disabled = _b.disabled,
    required = _b.required,
    readOnly = _b.readOnly,
    /** Strict Field Props */
    actions = _b.actions,
    actionsPosition = _b.actionsPosition,
    contentClassName = _b.contentClassName,
    hint = _b.hint,
    hintClassName = _b.hintClassName,
    icon = _b.icon,
    iconPosition = _b.iconPosition,
    label = _b.label,
    /** All other input Props */
    rawRest = _tslib.__rest(_b, [
      'clearable',
      'currency',
      'masked',
      'textarea',
      'type',
      'tabIndex',
      'selectAllOnClick',
      'value',
      'defaultValue',
      'textareaProps',
      'onClick',
      'onClear',
      'onChange',
      'onBlur',
      'onFocus',
      'disabled',
      'required',
      'readOnly',
      'actions',
      'actionsPosition',
      'contentClassName',
      'hint',
      'hintClassName',
      'icon',
      'iconPosition',
      'label',
    ]);
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClassName = _c[0],
    rest = _c[1];
  var ElementType = customHook.useElementType(Input, props);
  /* --------
   * Auto Controlled Component Value
   * -------- */
  var _d = useAutoControlledValue.useAutoControlledValue('', {
      prop: userDefinedValue,
      defaultProp: userDefinedDefaultValue,
    }),
    value = _d[0],
    trySetValue = _d[1];
  /* --------
   * Internal Component Ref
   * -------- */
  var fieldRef = React.useRef(null);
  var inputRef = React.useRef(null);
  /* --------
   * Component Classes
   * -------- */
  var classes = clsx__default['default'](
    { required: required, disabled: disabled, clearable: clearable },
    'text',
    stateClassName,
    className
  );
  /* --------
   * Class list Controller
   * -------- */
  var addClassesToRef = React.useCallback(function () {
    var classesToAdd = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      classesToAdd[_i] = arguments[_i];
    }
    classesToAdd.forEach(function (cx) {
      if (fieldRef.current) {
        fieldRef.current.classList.add(cx);
      }
      if (inputRef.current) {
        inputRef.current.classList.add(cx);
      }
    });
  }, []);
  var removeClassesFromRef = React.useCallback(function () {
    var classesToRemove = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      classesToRemove[_i] = arguments[_i];
    }
    classesToRemove.forEach(function (cx) {
      if (fieldRef.current) {
        fieldRef.current.classList.remove(cx);
      }
      if (inputRef.current) {
        inputRef.current.classList.remove(cx);
      }
    });
  }, []);
  /* --------
   * Input Handlers
   * -------- */
  var handleInputBlur = function (e) {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }
    /** Remove classes from reference */
    removeClassesFromRef('focused');
    /** Call user defined handler */
    if (userDefinedOnBlur) {
      userDefinedOnBlur(
        e,
        _tslib.__assign(_tslib.__assign({}, props), { value: value })
      );
    }
  };
  var handleInputChange = function (e) {
    /** Add class to reference */
    addClassesToRef('dirty');
    /** Call user defined handler */
    if (userDefinedOnChange) {
      userDefinedOnChange(
        e,
        _tslib.__assign(_tslib.__assign({}, props), { value: e.target.value })
      );
    }
    /** Try to change local input state value */
    trySetValue(e.target.value);
  };
  var handleInputClick = function (e) {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }
    /** Add classes to reference */
    addClassesToRef('touched');
    if (inputRef.current && selectAllOnClick) {
      inputRef.current.setSelectionRange(0, inputRef.current.value.length);
    }
    e.stopPropagation();
    if (userDefinedOnClick) {
      userDefinedOnClick(
        e,
        _tslib.__assign(_tslib.__assign({}, props), { value: value })
      );
    }
  };
  var handleInputFocus = function (e) {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }
    /** Add classes to reference */
    addClassesToRef('touched', 'focused');
    /** Call user defined handler */
    if (userDefinedOnFocus) {
      userDefinedOnFocus(
        e,
        _tslib.__assign(_tslib.__assign({}, props), { value: value })
      );
    }
  };
  var handleInputClear = React.useCallback(
    function (e) {
      var _a, _b;
      /** Manually set the input value, and after trigger the change event */
      if (inputRef.current) {
        /** Get the right value setter function from element */
        var valueSetter =
          (_a = Object.getOwnPropertyDescriptor(inputRef.current, 'value')) ===
            null || _a === void 0
            ? void 0
            : _a.set;
        var prototype = Object.getPrototypeOf(inputRef.current);
        var prototypeValueSetter =
          (_b = Object.getOwnPropertyDescriptor(prototype, 'value')) === null ||
          _b === void 0
            ? void 0
            : _b.set;
        /** Create the Event */
        var event_1 = new Event('input', { bubbles: true });
        event_1.simulated = true;
        /** Call the Value Setter Function */
        if (valueSetter !== prototypeValueSetter && prototypeValueSetter) {
          prototypeValueSetter.call(inputRef.current, '');
        } else if (valueSetter) {
          valueSetter.call(inputRef.current, '');
        }
        /** Dispatch the event */
        inputRef.current.dispatchEvent(event_1);
        /** Call user defined handler */
        if (userDefinedOnClear) {
          userDefinedOnClear(e);
        }
        /** Focus the input element */
        inputRef.current.focus();
      }
    },
    [userDefinedOnClear]
  );
  /* --------
   * Input Computed Properties
   * -------- */
  var tabIndex = useTabIndex.useTabIndex({
    disabled: disabled,
    readOnly: readOnly,
    prop: userDefinedTabIndex,
  });
  /* --------
   * Input Render
   * -------- */
  var renderInputElement = function () {
    var baseProps = {
      value: value,
      disabled: disabled,
      required: required,
      tabIndex: tabIndex,
      readOnly: readOnly,
      className: classes,
      autoComplete: 'off',
      type: type || 'text',
      onBlur: handleInputBlur,
      onChange: handleInputChange,
      onClick: handleInputClick,
      onFocus: handleInputFocus,
    };
    if (currency) {
      return null;
    }
    if (masked) {
      return React.createElement(
        ReactInputMask__default['default'],
        _tslib.__assign({}, baseProps, masked),
        function (inputProps) {
          return React.createElement(
            'input',
            _tslib.__assign({}, inputProps, rest, { ref: inputRef }, baseProps)
          );
        }
      );
    }
    if (textarea) {
      return React.createElement(
        TextareaAutosize__default['default'],
        _tslib.__assign(
          {},
          rest,
          { inputRef: inputRef },
          textareaProps,
          baseProps
        )
      );
    }
    return React.createElement(
      'input',
      _tslib.__assign({}, rest, { ref: inputRef }, baseProps)
    );
  };
  /* --------
   * Component Render
   * -------- */
  return React.createElement(
    Field,
    {
      as: ElementType,
      ref: fieldRef,
      disabled: disabled,
      required: required,
      actions: actions,
      actionsPosition: actionsPosition,
      contentClassName: contentClassName,
      hint: hint,
      hintClassName: hintClassName,
      icon: icon,
      iconPosition: iconPosition,
      label: label,
      readOnly: readOnly,
      clearable: clearable,
      onClear: handleInputClear,
      appearance: rawRest.appearance,
      danger: rawRest.danger,
      info: rawRest.info,
      primary: rawRest.primary,
      secondary: rawRest.secondary,
      success: rawRest.success,
      warning: rawRest.warning,
      contentType: 'input',
    },
    renderInputElement()
  );
};
Input.displayName = 'Input';
Input.defaultProps = {
  textareaProps: {
    minRows: 2,
    maxRows: 8,
  },
  type: 'text',
};

module.exports = Input;
//# sourceMappingURL=Input.js.map
