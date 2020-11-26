'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
require('../../elements/Button/ButtonGroup.js');
var Button = require('../../elements/Button/Button.js');
var Checkbox = require('../../elements/Checkbox/Checkbox.js');
var Input = require('../../elements/Input/Input.js');
var DayPicker = require('../../elements/DayPicker/DayPicker.js');
var Select = require('../../elements/Select/Select.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Form = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    disabled = _b.disabled,
    onSubmit = _b.onSubmit,
    rest = _tslib.__rest(_b, ['children', 'content', 'disabled', 'onSubmit']);
  /** Build the element class list */
  var classes = clsx__default['default'](
    { disabled: disabled },
    'form',
    className
  );
  /* --------
   * Form Submit Handler
   * -------- */
  var handleFormSubmit = function (e) {
    /** Prevent any default action, only if action props is not defined */
    if (typeof props.action !== 'string') {
      e.preventDefault();
    }
    /** Disabled Form couldn't be submitted */
    if (disabled) {
      return;
    }
    /** Call the user defined onSubmit handler */
    if (typeof onSubmit === 'function') {
      onSubmit(e, props);
    }
  };
  /* --------
   * Render the Form
   * -------- */
  return React.createElement(
    'form',
    _tslib.__assign({}, rest, {
      className: classes,
      onSubmit: handleFormSubmit,
    }),
    children
  );
};
Form.displayName = 'Form';
/* --------
 * Base Form Element
 * -------- */
Form.Button = Button;
Form.Checkbox = Checkbox;
Form.DayPicker = DayPicker;
Form.Input = Input;
Form.Select = Select;

module.exports = Form;
//# sourceMappingURL=Form.js.map
