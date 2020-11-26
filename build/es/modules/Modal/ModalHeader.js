'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Header = require('../../elements/Header/Header.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var ModalHeader = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    icon = _b.icon,
    meta = _b.meta,
    subheader = _b.subheader,
    rest = _tslib.__rest(_b, [
      'children',
      'content',
      'icon',
      'meta',
      'subheader',
    ]);
  /** Get the component element type */
  var ElementType = customHook.useElementType(ModalHeader, props);
  /** Build the element class list */
  var classes = clsx__default['default']('modal-header', className);
  /** Build a memoized Header */
  var headerElement = React.useMemo(
    function () {
      return Header.create(
        {
          content: content,
          icon: icon,
          subheader: subheader,
        },
        { autoGenerateKey: false }
      );
    },
    [content, icon, subheader]
  );
  var metaElement = React.useMemo(
    function () {
      return (
        meta && React.createElement('div', { className: 'modal-meta' }, meta)
      );
    },
    [meta]
  );
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
    headerElement,
    metaElement
  );
};
ModalHeader.displayName = 'ModalHeader';
ModalHeader.create = reactUiCore.createShorthandFactory(ModalHeader, function (
  content
) {
  return { content: content };
});

module.exports = ModalHeader;
//# sourceMappingURL=ModalHeader.js.map
