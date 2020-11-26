'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var ModalContent = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    rest = _tslib.__rest(_b, ['children', 'content']);
  /** Get the component element type */
  var ElementType = customHook.useElementType(ModalContent, props);
  /** Build the element class list */
  var classes = clsx__default['default']('modal-content', className);
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
    content
  );
};
ModalContent.displayName = 'ModalContent';
ModalContent.create = reactUiCore.createShorthandFactory(
  ModalContent,
  function (content) {
    return { content: content };
  }
);

module.exports = ModalContent;
//# sourceMappingURL=ModalContent.js.map
