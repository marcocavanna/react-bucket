'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var getSharedClassNames = require('../../lib/getSharedClassNames.js');
require('tiny-invariant');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var HeaderContent = function (props) {
  var _a = getSharedClassNames(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    rest = _tslib.__rest(_b, ['children', 'content']);
  var ElementType = reactUiCore.getElementType(HeaderContent, props);
  var classes = clsx__default['default']('content', className);
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    reactUiCore.childrenUtils.isNil(children) ? content : children
  );
};
HeaderContent.displayName = 'HeaderContent';
HeaderContent.defaultProps = {
  as: 'h3',
};
HeaderContent.create = reactUiCore.createShorthandFactory(
  HeaderContent,
  function (content) {
    return { content: content };
  }
);

module.exports = HeaderContent;
//# sourceMappingURL=HeaderContent.js.map
