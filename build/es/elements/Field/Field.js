'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var ButtonGroup = require('../Button/ButtonGroup.js');
var Icon = require('../Icon/Icon.js');
require('../Button/Button.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var FieldRender = function (props, ref) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    actions = _b.actions,
    actionsPosition = _b.actionsPosition,
    children = _b.children,
    content = _b.content,
    contentClassName = _b.contentClassName,
    clearable = _b.clearable,
    disabled = _b.disabled,
    hint = _b.hint,
    hintClassName = _b.hintClassName,
    icon = _b.icon,
    iconPosition = _b.iconPosition,
    isFocused = _b.isFocused,
    isDirty = _b.isDirty,
    isTouched = _b.isTouched,
    label = _b.label,
    onClear = _b.onClear,
    required = _b.required,
    readOnly = _b.readOnly,
    contentType = _b.contentType,
    rawRest = _tslib.__rest(_b, [
      'actions',
      'actionsPosition',
      'children',
      'content',
      'contentClassName',
      'clearable',
      'disabled',
      'hint',
      'hintClassName',
      'icon',
      'iconPosition',
      'isFocused',
      'isDirty',
      'isTouched',
      'label',
      'onClear',
      'required',
      'readOnly',
      'contentType',
    ]);
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClassName = _c[0],
    rest = _c[1];
  /* --------
   * Define Classes to Use
   * -------- */
  var classes = clsx__default['default'](
    {
      required: required,
      disabled: disabled,
      dirty: isDirty,
      focused: isFocused,
      touched: isTouched,
      readonly: readOnly,
      clearable: clearable,
    },
    contentType,
    'field',
    stateClassName,
    className
  );
  var containerClasses = React.useMemo(
    function () {
      return clsx__default['default'](
        {
          'action-on-left':
            (actions === null || actions === void 0
              ? void 0
              : actions.length) && actionsPosition === 'left',
          'action-on-right':
            (actions === null || actions === void 0
              ? void 0
              : actions.length) && actionsPosition === 'right',
        },
        'wrapper'
      );
    },
    [actions, actionsPosition]
  );
  var contentClasses = React.useMemo(
    function () {
      return clsx__default['default'](
        'content',
        {
          'icon-on-left': !!icon && iconPosition === 'left',
          'icon-on-right': !!icon && iconPosition === 'right',
        },
        contentClassName
      );
    },
    [contentClassName, icon, iconPosition]
  );
  /* --------
   * Compute Field Addon
   * -------- */
  var actionsElement = React.useMemo(
    function () {
      if (actions === null || actions === void 0 ? void 0 : actions.length) {
        return ButtonGroup.create(actions, { autoGenerateKey: true });
      }
      return null;
    },
    [actions]
  );
  var leftFieldContent = React.useMemo(
    function () {
      return (
        actionsElement &&
        actionsPosition === 'left' &&
        React.createElement(
          'div',
          { className: 'addon left' },
          actionsPosition === 'left' && actionsElement
        )
      );
    },
    [actionsElement, actionsPosition]
  );
  var rightFieldContent = React.useMemo(
    function () {
      return (
        actionsElement &&
        actionsPosition === 'right' &&
        React.createElement(
          'div',
          { className: 'addon right' },
          actionsPosition === 'right' && actionsElement
        )
      );
    },
    [actionsElement, actionsPosition]
  );
  var iconContent = React.useMemo(
    function () {
      return icon && Icon.create(icon, { autoGenerateKey: false });
    },
    [icon]
  );
  var hintElement = React.useMemo(
    function () {
      if (!hint) {
        return null;
      }
      var hintClasses = clsx__default['default'](
        'addon down',
        'hint',
        hintClassName
      );
      return React.createElement('div', { className: hintClasses }, hint);
    },
    [hint, hintClassName]
  );
  /* --------
   * Input Actions
   * -------- */
  var clearButton = React.useMemo(
    function () {
      return (
        clearable &&
        !disabled &&
        !readOnly &&
        Icon.create(
          {
            name: 'times',
            onClick: onClear,
          },
          {
            autoGenerateKey: true,
            defaultProps: { className: 'clear' },
          }
        )
      );
    },
    [onClear, clearable, disabled, readOnly]
  );
  /* --------
   * Render Component
   * -------- */
  return React.createElement(
    'div',
    _tslib.__assign({}, rest, { ref: ref, className: classes }),
    label && React.createElement('label', { htmlFor: props.id }, label),
    React.createElement(
      'div',
      { className: containerClasses },
      leftFieldContent,
      React.createElement(
        'div',
        { className: contentClasses },
        iconPosition === 'left' && iconContent,
        reactUiCore.childrenUtils.isNil(children) ? content : children,
        clearButton,
        iconPosition === 'right' && iconContent
      ),
      rightFieldContent
    ),
    hintElement
  );
};
var Field = React.forwardRef(FieldRender);
Field.defaultProps = {
  actionsPosition: 'right',
  iconPosition: 'left',
};
Field.create = reactUiCore.createShorthandFactory(Field, function (content) {
  return { content: content };
});

module.exports = Field;
//# sourceMappingURL=Field.js.map
