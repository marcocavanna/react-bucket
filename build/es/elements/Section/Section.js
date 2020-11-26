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
var Section = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    direction = _b.direction,
    divided = _b.divided,
    icon = _b.icon,
    label = _b.label,
    reverse = _b.reverse,
    rest = _tslib.__rest(_b, [
      'children',
      'content',
      'direction',
      'divided',
      'icon',
      'label',
      'reverse',
    ]);
  var classes = clsx__default['default'](
    direction,
    { divided: divided, reverse: reverse },
    'section',
    className
  );
  var labelClasses = clsx__default['default'](
    'label',
    reactUiCore.classByKey(
      direction === 'horizontal' && reverse,
      'has-text-right'
    )
  );
  var contentClasses = clsx__default['default'](
    'content',
    reactUiCore.classByKey(
      direction === 'horizontal' && !reverse,
      'has-text-right'
    )
  );
  var ElementType = customHook.useElementType(Section, props);
  var labelElement = React.useMemo(
    function () {
      return (
        label &&
        React.createElement(
          'div',
          { className: labelClasses },
          Icon.create(icon, { autoGenerateKey: false }),
          label
        )
      );
    },
    [label, icon, labelClasses]
  );
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    labelElement,
    React.createElement(
      'div',
      { className: contentClasses },
      reactUiCore.childrenUtils.isNil(children) ? content : children
    )
  );
};
Section.displayName = 'Section';
Section.defaultProps = {
  direction: 'vertical',
};

module.exports = Section;
//# sourceMappingURL=Section.js.map
