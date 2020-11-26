'use strict';

var _tslib = require('../_virtual/_tslib.js');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

function fallBackTrueValue(original) {
  if (original === true) {
    return 'true';
  }
  return original;
}
/**
 * Some prop can be responsive, so can be computed
 * differently if they are primitive, or an object of value
 *
 * @param prop Prop to Compute
 * @param pattern Pattern to Use to build className
 */
function computeResponsiveClassName(prop, pattern) {
  // Assert prop is a valid computable prop
  if (prop == null || prop === false) {
    return undefined;
  }
  // If prop is not an object, return as master class
  if (typeof prop !== 'object') {
    return reactUiCore.classByPattern(fallBackTrueValue(prop), pattern);
  }
  return clsx__default['default'](
    reactUiCore.classByPattern(
      fallBackTrueValue(prop.phoneUp),
      'on-phone-' + pattern
    ),
    reactUiCore.classByPattern(
      fallBackTrueValue(prop.tabletUp),
      'on-tablet-' + pattern
    ),
    reactUiCore.classByPattern(
      fallBackTrueValue(prop.desktopUp),
      'on-desktop-' + pattern
    ),
    reactUiCore.classByPattern(
      fallBackTrueValue(prop.largeDesktopUp),
      'on-large-desktop-' + pattern
    )
  );
}
function getSharedClassNames(props) {
  var as = props.as,
    backgroundColor = props.backgroundColor,
    className = props.className,
    columnsAlign = props.columnsAlign,
    display = props.display,
    fontWeight = props.fontWeight,
    width = props.width,
    offsetBy = props.offsetBy,
    size = props.size,
    textAlign = props.textAlign,
    textColor = props.textColor,
    verticalAlign = props.verticalAlign,
    withoutGap = props.withoutGap,
    rest = _tslib.__rest(props, [
      'as',
      'backgroundColor',
      'className',
      'columnsAlign',
      'display',
      'fontWeight',
      'width',
      'offsetBy',
      'size',
      'textAlign',
      'textColor',
      'verticalAlign',
      'withoutGap',
    ]);
  // Build Classes
  var classes = clsx__default['default'](
    // The background color
    reactUiCore.classByPattern(backgroundColor, 'has-background-%value%'),
    // Main text Color
    reactUiCore.classByPattern(textColor, 'has-text-%value%'),
    // Main font weight
    reactUiCore.classByPattern(fontWeight, 'has-font-%value%'),
    // Content Size
    reactUiCore.isValue(size),
    // Text Align
    reactUiCore.classByPattern(textAlign, 'has-text-%value%'),
    // Responsive Props
    computeResponsiveClassName(columnsAlign, '%value%'),
    computeResponsiveClassName(display, 'is-%value%'),
    computeResponsiveClassName(width, 'is-%value%'),
    computeResponsiveClassName(offsetBy, 'offset-by-%value%'),
    computeResponsiveClassName(verticalAlign, '%value%'),
    computeResponsiveClassName(withoutGap, 'without-gap'),
    // User defined classes
    className
  );
  return { className: classes, rest: rest };
}

module.exports = getSharedClassNames;
//# sourceMappingURL=getSharedClassNames.js.map
