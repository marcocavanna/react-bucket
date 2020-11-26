'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
require('../../elements/Button/ButtonGroup.js');
var Button = require('../../elements/Button/Button.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var ModalActions = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    actions = _b.actions,
    children = _b.children,
    onActionClick = _b.onActionClick,
    rest = _tslib.__rest(_b, [
      'actions',
      'children',
      'content',
      'onActionClick',
    ]);
  /** Get the component element type */
  var ElementType = customHook.useElementType(ModalActions, props);
  /** Build the element class list */
  var classes = clsx__default['default']('modal-actions', className);
  /** If children are declared, render them */
  if (!reactUiCore.childrenUtils.isNil(children)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      children
    );
  }
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    Array.isArray(actions) &&
      actions.map(function (button) {
        return Button.create(button, {
          autoGenerateKey: false,
          overrideProps: function (predefinedProps) {
            return {
              onClick: function (e, buttonProps) {
                if (predefinedProps.onClick) {
                  predefinedProps.onClick(e, buttonProps);
                }
                if (onActionClick) {
                  onActionClick(e, buttonProps);
                }
              },
            };
          },
        });
      })
  );
};
ModalActions.displayName = 'ModalActions';
ModalActions.create = reactUiCore.createShorthandFactory(
  ModalActions,
  function (value) {
    return {
      actions: value,
    };
  }
);

module.exports = ModalActions;
//# sourceMappingURL=ModalActions.js.map
