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
var TableHeader = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    rest = _tslib.__rest(_b, ['children', 'content']);
  var ElementType = customHook.useElementType(TableHeader, props);
  var classes = clsx__default['default'](className, 'head');
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    reactUiCore.childrenUtils.isNil(children) ? content : children
  );
};
TableHeader.displayName = 'TableHeader';
TableHeader.defaultProps = {
  as: 'thead',
};
TableHeader.create = reactUiCore.createShorthandFactory(TableHeader, function (
  content
) {
  return { content: content };
});

module.exports = TableHeader;
//# sourceMappingURL=TableHeader.js.map
