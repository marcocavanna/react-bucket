'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Button = require('./Button.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var ButtonGroup = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    buttons = _b.buttons,
    full = _b.full,
    vertical = _b.vertical,
    rest = _tslib.__rest(_b, [
      'children',
      'content',
      'buttons',
      'full',
      'vertical',
    ]);
  /** Get the Element Type */
  var ElementType = customHook.useElementType(ButtonGroup, props);
  /** Build Component Classes */
  var classes = clsx__default['default'](
    { full: full, vertical: vertical },
    'buttons',
    className
  );
  /** If children are defined return the element */
  var hasChildren = !reactUiCore.childrenUtils.isNil(children);
  if (hasChildren || content) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      !hasChildren ? content : children
    );
  }
  /** Generate Buttons */
  var buttonsElement = Array.isArray(buttons)
    ? buttons.map(function (buttonProps) {
        return Button.create(buttonProps, { autoGenerateKey: true });
      })
    : [];
  /** Return the Group */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    buttonsElement
  );
};
/** Properly Set displayName */
ButtonGroup.displayName = 'ButtonGroup';
/** Implements the Create Factory Method */
ButtonGroup.create = reactUiCore.createShorthandFactory(ButtonGroup, function (
  buttons
) {
  return {
    buttons: buttons,
  };
});

module.exports = ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map
