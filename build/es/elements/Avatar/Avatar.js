'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Icon = require('../Icon/Icon.js');
var Popup = require('../../modules/Popup/Popup.js');
var Badge = require('../Badge/Badge.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Avatar = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    badge = _b.badge,
    content = _b.content,
    children = _b.children,
    disabled = _b.disabled,
    icon = _b.icon,
    onClick = _b.onClick,
    tooltip = _b.tooltip,
    type = _b.type,
    rawRest = _tslib.__rest(_b, [
      'badge',
      'content',
      'children',
      'disabled',
      'icon',
      'onClick',
      'tooltip',
      'type',
    ]);
  /** Get the component element type */
  var ElementType = customHook.useElementType(Avatar, props);
  /** Split state className from rest props */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClasses = _c[0],
    rest = _c[1];
  /** Build the element class list */
  var classes = clsx__default['default'](
    {
      badged: badge,
      disabled: disabled,
      clickable: onClick,
    },
    type,
    'avatar',
    stateClasses,
    className
  );
  /** Check if Component has Children */
  var hasChildren = !reactUiCore.childrenUtils.isNil(children);
  var handleClick = function (e) {
    /** Call user defined handler */
    if (onClick && !disabled) {
      /** Disable event propagation */
      e.stopPropagation();
      onClick(e, props);
    }
  };
  // ----
  // Build Memoized Element
  // ----
  var avatarContentElement = React.useMemo(
    function () {
      if (hasChildren) {
        return null;
      }
      if (icon) {
        return Icon.create(icon, { autoGenerateKey: false });
      }
      return content;
    },
    [icon, content, hasChildren]
  );
  var badgeElement = React.useMemo(
    function () {
      return badge === true
        ? React.createElement(Badge, null)
        : Badge.create(badge, {
            autoGenerateKey: false,
          });
    },
    [badge]
  );
  // ----
  // Build the Element that could be wrapped inside a tooltip
  // ----
  var avatarElement = React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { onClick: handleClick, className: classes }),
    React.createElement(
      'div',
      { className: 'content' },
      hasChildren ? children : avatarContentElement
    ),
    badgeElement
  );
  return tooltip && !disabled
    ? React.createElement(Popup, { trigger: avatarElement, content: tooltip })
    : avatarElement;
};
Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  type: 'round',
};
Avatar.create = reactUiCore.createShorthandFactory(Avatar, function (content) {
  return { content: content };
});

module.exports = Avatar;
//# sourceMappingURL=Avatar.js.map
