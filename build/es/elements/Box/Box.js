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

var appendValueToClass = function (prefix, prop) {
  return typeof prop === 'number' || typeof prop === 'string'
    ? prefix + '-' + prop
    : undefined;
};
/* --------
 * Component Render
 * -------- */
var Box = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    elevation = _b.elevation,
    m = _b.m,
    mb = _b.mb,
    ml = _b.ml,
    mr = _b.mr,
    mt = _b.mt,
    mx = _b.mx,
    my = _b.my,
    p = _b.p,
    pb = _b.pb,
    pl = _b.pl,
    pr = _b.pr,
    pt = _b.pt,
    px = _b.px,
    py = _b.py,
    rest = _tslib.__rest(_b, [
      'children',
      'content',
      'elevation',
      'm',
      'mb',
      'ml',
      'mr',
      'mt',
      'mx',
      'my',
      'p',
      'pb',
      'pl',
      'pr',
      'pt',
      'px',
      'py',
    ]);
  var ElementType = reactUiCore.getElementType(Box, props);
  var classes = React.useMemo(
    function () {
      return clsx__default['default'](
        'box',
        appendValueToClass('elevation', elevation),
        appendValueToClass('m', m),
        appendValueToClass('mb', mb),
        appendValueToClass('ml', ml),
        appendValueToClass('mr', mr),
        appendValueToClass('mt', mt),
        appendValueToClass('mx', mx),
        appendValueToClass('my', my),
        appendValueToClass('p', p),
        appendValueToClass('pb', pb),
        appendValueToClass('pl', pl),
        appendValueToClass('pr', pr),
        appendValueToClass('pt', pt),
        appendValueToClass('px', px),
        appendValueToClass('py', py),
        className
      );
    },
    [className, elevation, m, mb, ml, mr, mt, mx, my, p, pb, pl, pr, pt, px, py]
  );
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    reactUiCore.childrenUtils.isNil(children) ? content : children
  );
};
Box.displayName = 'Box';

module.exports = Box;
//# sourceMappingURL=Box.js.map
