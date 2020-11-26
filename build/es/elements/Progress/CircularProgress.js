'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var useProgressProps = require('./lib/useProgressProps.js');
var useProgressIndicator = require('./lib/useProgressIndicator.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var CircularProgress = function (props) {
  var _a = useProgressProps(props),
    className = _a.className,
    progress = _a.progress,
    _b = _a.rest,
    as = _b.as,
    indicator = _b.indicator,
    radius = _b.radius,
    strokeWidth = _b.strokeWidth,
    userDefinedStyle = _b.style,
    rest = _tslib.__rest(_b, [
      'as',
      'indicator',
      'radius',
      'strokeWidth',
      'style',
    ]);
  var ElementType = customHook.useElementType(CircularProgress, props);
  var classes = clsx__default['default'](className, 'circular');
  /** Build the Indicator Element */
  var indicatorElement = useProgressIndicator(indicator, progress);
  // ----
  // Circle Build Value
  // ----
  var circle = React.useMemo(
    function () {
      var startingStrokeWidth = indicatorElement
        ? strokeWidth - 2
        : strokeWidth;
      var startingRadius = indicatorElement ? radius + 1 : radius;
      switch (props.size) {
        case 'extra small':
          return {
            radius: startingRadius / 3,
            stroke: startingStrokeWidth / 2,
          };
        case 'small':
          return {
            radius: startingRadius / 1.75,
            stroke: startingStrokeWidth / 1.5,
          };
        case 'large':
          return {
            radius: startingRadius * 1.75,
            stroke: startingStrokeWidth * 1.5,
          };
        case 'big':
          return {
            radius: startingRadius * 3,
            stroke: startingStrokeWidth * 2.5,
          };
        case 'huge':
          return {
            radius: startingRadius * 4.5,
            stroke: startingStrokeWidth * 4,
          };
        default:
          return { radius: startingRadius, stroke: startingStrokeWidth };
      }
    },
    [indicatorElement, strokeWidth, radius, props.size]
  );
  var size = Math.ceil(circle.radius * 2 + circle.stroke);
  var viewBox = [0, 0, size, size].join(' ');
  var dashArray = circle.radius * Math.PI * 2;
  var dashOffset = dashArray - (dashArray * progress.width) / 100;
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, {
      className: classes,
      style: _tslib.__assign(_tslib.__assign({}, userDefinedStyle), {
        height: size + 'px',
        width: size + 'px',
      }),
    }),
    React.createElement(
      'svg',
      { width: size, height: size, viewBox: viewBox },
      React.createElement('circle', {
        className: 'bar',
        cx: size / 2,
        cy: size / 2,
        r: circle.radius,
        strokeWidth: circle.stroke + 'px',
      }),
      React.createElement('circle', {
        className: 'value',
        cx: size / 2,
        cy: size / 2,
        r: circle.radius,
        strokeWidth: circle.stroke + 'px',
        transform: 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')',
        style: {
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        },
      })
    ),
    indicatorElement
  );
};
CircularProgress.displayName = 'CircularProgress';
CircularProgress.defaultProps = {
  max: 100,
  min: 0,
  radius: 16,
  strokeWidth: 10,
};
CircularProgress.create = reactUiCore.createShorthandFactory(
  CircularProgress,
  function (value) {
    return { value: value };
  }
);

module.exports = CircularProgress;
//# sourceMappingURL=CircularProgress.js.map
