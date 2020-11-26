'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Avatar = require('../Avatar/Avatar.js');
var ItemContent = require('./ItemContent.js');
var ItemGroup = require('./ItemGroup.js');
var ItemTools = require('./ItemTools.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Item = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    active = _b.active,
    avatar = _b.avatar,
    centered = _b.centered,
    children = _b.children,
    content = _b.content,
    disabled = _b.disabled,
    header = _b.header,
    loading = _b.loading,
    meta = _b.meta,
    onClick = _b.onClick,
    tools = _b.tools,
    rawRest = _tslib.__rest(_b, [
      'active',
      'avatar',
      'centered',
      'children',
      'content',
      'disabled',
      'header',
      'loading',
      'meta',
      'onClick',
      'tools',
    ]);
  /** Get the component element type */
  var ElementType = customHook.useElementType(Item, props);
  /** Split state className from rest props */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClasses = _c[0],
    rest = _c[1];
  /** Build the element class list */
  var classes = clsx__default['default'](
    {
      active: active,
      disabled: disabled,
      centered: centered,
      clickable: onClick,
      loading: loading,
    },
    'item',
    stateClasses,
    className
  );
  var hasChildren = !reactUiCore.childrenUtils.isNil(children);
  /** Define Click Handler */
  var handleClick = function (e) {
    /** Avoid click when disabled */
    if (disabled) {
      return;
    }
    /** Call user defined handler */
    if (onClick) {
      onClick(e, props);
    }
  };
  // ----
  // Define Component Memoized Element
  // ----
  var avatarElement = React.useMemo(
    function () {
      return (
        !hasChildren &&
        Avatar.create(avatar, {
          autoGenerateKey: false,
          defaultProps: {
            disabled: disabled,
            success: props.success,
            danger: props.danger,
            appearance: props.appearance,
            warning: props.warning,
            primary: props.primary,
          },
        })
      );
    },
    [
      hasChildren,
      avatar,
      disabled,
      props.success,
      props.danger,
      props.appearance,
      props.warning,
      props.primary,
    ]
  );
  var contentElement = React.useMemo(
    function () {
      return (
        !hasChildren &&
        (loading || header || content || meta) &&
        ItemContent.create(
          {
            header: header,
            content: content,
            meta: meta,
            loading: loading,
          },
          {
            autoGenerateKey: false,
          }
        )
      );
    },
    [hasChildren, loading, header, content, meta]
  );
  var toolsElement = React.useMemo(
    function () {
      return (
        !hasChildren &&
        ItemTools.create(tools, {
          autoGenerateKey: false,
          defaultProps: {
            disabled: disabled,
          },
        })
      );
    },
    [disabled, hasChildren, tools]
  );
  // ----
  // Component render with declared children
  // ----
  if (hasChildren) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { onClick: handleClick, className: classes }),
      children
    );
  }
  // ----
  // Component render with shorthand
  // ----
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { onClick: handleClick, className: classes }),
    avatarElement,
    contentElement,
    toolsElement
  );
};
Item.displayName = 'Item';
Item.Avatar = Avatar;
Item.Content = ItemContent;
Item.Tools = ItemTools;
Item.Group = ItemGroup;
Item.create = reactUiCore.createShorthandFactory(Item, function (content) {
  return { content: content };
});

module.exports = Item;
//# sourceMappingURL=Item.js.map
