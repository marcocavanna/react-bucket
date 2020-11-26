'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var useAutoControlledValue = require('../../hooks/useAutoControlledValue.js');
var MenuItem = require('./MenuItem.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Declare
 * -------- */
var Menu = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    userDefinedActiveIndex = _b.activeIndex,
    children = _b.children,
    content = _b.content,
    defaultActiveIndex = _b.defaultActiveIndex,
    items = _b.items,
    onItemClick = _b.onItemClick,
    secondary = _b.secondary,
    tab = _b.tab,
    text = _b.text,
    vertical = _b.vertical,
    rest = _tslib.__rest(_b, [
      'activeIndex',
      'children',
      'content',
      'defaultActiveIndex',
      'items',
      'onItemClick',
      'secondary',
      'tab',
      'text',
      'vertical',
    ]);
  /** Control Active Index */
  var _c = useAutoControlledValue.useAutoControlledValue(0, {
      prop: userDefinedActiveIndex,
      defaultProp: defaultActiveIndex,
    }),
    activeIndex = _c[0],
    trySetActiveIndex = _c[1];
  /** Get the component element type */
  var ElementType = customHook.useElementType(Menu, props);
  /** Build the element class list */
  var classes = clsx__default['default'](
    {
      secondary: secondary,
      tab: tab,
      text: text,
      vertical: vertical,
    },
    'menu',
    className
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
    Array.isArray(items)
      ? items.map(function (item, ix) {
          return MenuItem.create(item, {
            autoGenerateKey: true,
            defaultProps: {
              active: activeIndex === ix,
              index: ix,
            },
            overrideProps: function (predefinedProps) {
              return {
                onClick: function (e, itemProps) {
                  /** Extract Index from Props */
                  var index = itemProps.index;
                  /** Try to set the new Active Index state */
                  trySetActiveIndex(index);
                  /** Invoke props if exists */
                  if (onItemClick) {
                    onItemClick(e, itemProps);
                  }
                  if (predefinedProps.onClick) {
                    predefinedProps.onClick(e, itemProps);
                  }
                },
              };
            },
          });
        })
      : content
  );
};
Menu.displayName = 'Menu';
Menu.create = reactUiCore.createShorthandFactory(Menu, function (items) {
  return {
    items: items,
  };
});
Menu.Item = MenuItem;

module.exports = Menu;
//# sourceMappingURL=Menu.js.map
