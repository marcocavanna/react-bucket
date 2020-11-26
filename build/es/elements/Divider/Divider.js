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
var Divider = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    rawRest = _tslib.__rest(_b, ['children', 'content']);
  /** Get the component element type */
  var ElementType = customHook.useElementType(Divider, props);
  /** Split state className from rest props */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClasses = _c[0],
    rest = _c[1];
  /** Check if component has children */
  var hasChildren = !reactUiCore.childrenUtils.isNil(children);
  /** Build the element class list */
  var classes = clsx__default['default'](
    'horizontal',
    (hasChildren || content) && 'text',
    'divider',
    stateClasses,
    className
  );
  /** Component render */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    (hasChildren || content) &&
      React.createElement(
        'div',
        { className: 'content' },
        hasChildren ? children : content
      )
  );
};
Divider.displayName = 'Divider';
Divider.defaultProps = {
  textAlign: 'center',
};

module.exports = Divider;
//# sourceMappingURL=Divider.js.map
