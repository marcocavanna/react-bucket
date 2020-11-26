'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Item = require('./Item.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var ItemGroup = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    divided = _b.divided,
    items = _b.items,
    relaxed = _b.relaxed,
    rest = _tslib.__rest(_b, [
      'children',
      'content',
      'divided',
      'items',
      'relaxed',
    ]);
  /** Get the component element type */
  var ElementType = customHook.useElementType(ItemGroup, props);
  /** Build the element class list */
  var classes = clsx__default['default'](
    { divided: divided, relaxed: relaxed },
    'items',
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
    items &&
      items.map(function (item) {
        return Item.create(item, {
          autoGenerateKey: false,
        });
      })
  );
};
ItemGroup.displayName = 'ItemGroup';

module.exports = ItemGroup;
//# sourceMappingURL=ItemGroup.js.map
