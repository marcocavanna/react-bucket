'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Icon = require('../../elements/Icon/Icon.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var MenuItem = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    active = _b.active,
    children = _b.children,
    content = _b.content,
    disabled = _b.disabled,
    icon = _b.icon,
    onClick = _b.onClick,
    rest = _tslib.__rest(_b, [
      'active',
      'children',
      'content',
      'disabled',
      'icon',
      'onClick',
    ]);
  var ElementType = customHook.useElementType(MenuItem, props);
  var handleClick = function (e) {
    if (disabled) {
      return;
    }
    e.stopPropagation();
    if (typeof onClick === 'function') {
      onClick(e, props);
    }
  };
  var classes = clsx__default['default'](
    {
      active: active,
      disabled: disabled,
    },
    'menu-item',
    className
  );
  var iconElement = React.useMemo(
    function () {
      return Icon.create(icon, { autoGenerateKey: false });
    },
    [icon]
  );
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes, onClick: handleClick }),
    iconElement,
    reactUiCore.childrenUtils.isNil(children) ? content : children
  );
};
MenuItem.displayName = 'MenuItem';
MenuItem.create = reactUiCore.createShorthandFactory(MenuItem, function (
  content
) {
  return { content: content };
});

module.exports = MenuItem;
//# sourceMappingURL=MenuItem.js.map
