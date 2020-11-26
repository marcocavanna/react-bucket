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
var Container = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    fixedTo = _b.fixedTo,
    fluid = _b.fluid,
    rest = _tslib.__rest(_b, ['children', 'content', 'fixedTo', 'fluid']);
  var ElementType = customHook.useElementType(Container, props);
  var classes = clsx__default['default'](
    { fluid: fluid },
    fixedTo,
    'container',
    className
  );
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    reactUiCore.childrenUtils.isNil(children) ? content : children
  );
};
Container.displayName = 'Container';

module.exports = Container;
//# sourceMappingURL=Container.js.map
