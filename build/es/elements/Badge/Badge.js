'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Icon = require('../Icon/Icon.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Badge = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    icon = _b.icon,
    rawRest = _tslib.__rest(_b, ['children', 'content', 'icon']);
  /** Get the component element type */
  var ElementType = customHook.useElementType(Badge, props);
  /** Check if component has declared children */
  var hasChildren = !reactUiCore.childrenUtils.isNil(children);
  /** Split state className from rest props */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClasses = _c[0],
    rest = _c[1];
  /** Build the element class list */
  var classes = clsx__default['default'](
    'badge',
    stateClasses,
    (!!content || !!hasChildren || !!icon) && 'with-content',
    className
  );
  /** Build Icon Element */
  var iconElement = React.useMemo(
    function () {
      return (
        !hasChildren &&
        Icon.create(icon, {
          autoGenerateKey: false,
        })
      );
    },
    [icon, hasChildren]
  );
  /** If children are declared, render them */
  if (!reactUiCore.childrenUtils.isNil(children)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      React.createElement('div', { className: 'content' }, children)
    );
  }
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    React.createElement('div', { className: 'content' }, iconElement, content)
  );
};
Badge.displayName = 'Badge';
Badge.create = reactUiCore.createShorthandFactory(Badge, function (content) {
  return { content: content };
});

module.exports = Badge;
//# sourceMappingURL=Badge.js.map
