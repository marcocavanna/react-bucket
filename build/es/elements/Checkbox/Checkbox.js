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

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Checkbox = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    /** Strict Checkbox Props */
    checkedProp = _b.checked,
    defaultChecked = _b.defaultChecked,
    radio = _b.radio,
    userDefinedTabIndex = _b.tabIndex,
    handleChecked = _b.onChecked,
    handleClick = _b.onClick,
    handleUnchecked = _b.onUnchecked,
    asSwitch = _b.switch,
    /** Overridden Checkbox Handlers */
    /** Shared Checkbox/Field Props */
    disabled = _b.disabled,
    required = _b.required,
    readOnly = _b.readOnly,
    /** Strict Field Props */
    contentClassName = _b.contentClassName,
    hint = _b.hint,
    hintClassName = _b.hintClassName,
    icon = _b.icon,
    iconPosition = _b.iconPosition,
    label = _b.label,
    /** All other Checkbox props */
    rawRest = _tslib.__rest(_b, [
      'checked',
      'defaultChecked',
      'radio',
      'tabIndex',
      'type',
      'onChecked',
      'onClick',
      'onUnchecked',
      'switch',
      'disabled',
      'required',
      'readOnly',
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
  var ElementType = customHook.useElementType(Checkbox, props);
  /* --------
   * AutoControlled Checked State
   * -------- */
  var _d = useAutoControlledValue.useAutoControlledValue(false, {
      prop: checkedProp,
      defaultProp: defaultChecked,
    }),
    checked = _d[0],
    trySetChecked = _d[1];
  /* --------
   * Internal Component Ref
   * -------- */
  var fieldRef = React.useRef(null);
  /* --------
   * Change Field Classes based on State
   * -------- */
  React.useEffect(
    function () {
      if (!fieldRef.current) {
        return;
      }
      if (checked) {
        fieldRef.current.classList.add('checked');
      } else {
        fieldRef.current.classList.remove('checked');
      }
    },
    [checked, fieldRef]
  );
  /* --------
   * Component Classes
   * -------- */
  var checkBoxType = radio ? 'radio' : asSwitch ? 'switch' : 'checkbox';
  var classes = clsx__default['default'](
    { required: required, disabled: disabled, checked: checked },
    checkBoxType,
    stateClassName,
    className
  );
  /* --------
   * Internal Checkbox Props
   * -------- */
  var canToggle = React.useMemo(
    function () {
      return !disabled && !readOnly && !(radio && checked);
    },
    [disabled, readOnly, radio, checked]
  );
  var tabIndex = useTabIndex.useTabIndex({
    disabled: disabled,
    readOnly: readOnly,
    prop: userDefinedTabIndex,
  });
  /* --------
   * Component Handlers
   * -------- */
  var handleLabelClick = function (e) {
    /** If checkbox could not toggle, return */
    if (!canToggle) {
      return;
    }
    /** Build the Handler Params to be reused */
    var changeHandlerParams = [
      e,
      _tslib.__assign(_tslib.__assign({}, props), { checked: !checked }),
    ];
    /** Call user defined Handlers */
    if (handleClick) {
      handleClick.apply(void 0, changeHandlerParams);
    }
    if (!checked && handleChecked) {
      handleChecked.apply(void 0, changeHandlerParams);
    } else if (checked && handleUnchecked) {
      handleUnchecked.apply(void 0, changeHandlerParams);
    }
    /** Try to set the internal auto controlled state */
    trySetChecked(!checked);
  };
  /* --------
   * Memoized Component Element
   * -------- */
  var labelElement = React.createElement(
    'label',
    { htmlFor: rest.id, onClick: handleLabelClick },
    label
  );
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
      contentClassName: contentClassName,
      hint: hint,
      hintClassName: hintClassName,
      icon: icon,
      iconPosition: iconPosition,
      readOnly: readOnly,
      appearance: rawRest.appearance,
      danger: rawRest.danger,
      info: rawRest.info,
      primary: rawRest.primary,
      secondary: rawRest.secondary,
      success: rawRest.success,
      warning: rawRest.warning,
      contentType: checkBoxType,
    },
    React.createElement(
      'input',
      _tslib.__assign({}, rest, {
        readOnly: true,
        className: classes,
        disabled: disabled,
        checked: checked,
        tabIndex: tabIndex,
        type: radio ? 'radio' : 'checkbox',
      })
    ),
    labelElement
  );
};

module.exports = Checkbox;
//# sourceMappingURL=Checkbox.js.map
