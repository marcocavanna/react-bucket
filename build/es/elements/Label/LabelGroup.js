'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Label = require('./Label.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var LabelGroup = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    labels = _b.labels,
    rest = _tslib.__rest(_b, ['children', 'labels']);
  /** Get the component element type */
  var ElementType = customHook.useElementType(LabelGroup, props);
  /** Build the element class list */
  var classes = clsx__default['default']('labels', className);
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
    Array.isArray(labels) &&
      labels.map(function (label) {
        return Label.create(label, {
          autoGenerateKey: true,
        });
      })
  );
};
LabelGroup.displayName = 'LabelGroup';

module.exports = LabelGroup;
//# sourceMappingURL=LabelGroup.js.map
