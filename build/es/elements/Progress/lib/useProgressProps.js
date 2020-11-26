'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

function useProgressProps(props) {
  var appearance = props.appearance,
    className = props.className,
    _a = props.colorSteps,
    _b = _a === void 0 ? {} : _a,
    _c = _b.low,
    lowStep = _c === void 0 ? 20 : _c,
    _d = _b.midLow,
    midLowStep = _d === void 0 ? 40 : _d,
    _e = _b.midHigh,
    midHighStep = _e === void 0 ? 60 : _e,
    _f = _b.high,
    highStep = _f === void 0 ? 80 : _f,
    discreet = props.discreet,
    inverted = props.inverted,
    userDefinedMax = props.max,
    userDefinedMin = props.min,
    size = props.size,
    userDefinedValue = props.value,
    rest = _tslib.__rest(props, [
      'appearance',
      'className',
      'colorSteps',
      'discreet',
      'inverted',
      'max',
      'min',
      'size',
      'value',
    ]);
  var memoizedProgressProps = React.useMemo(
    function () {
      // ----
      // Normalize Value and Percentage
      // ----
      var tmpValue = Math.round(userDefinedValue * 100) / 100;
      var tmpMax = Math.round(userDefinedMax * 100) / 100;
      var progressMin = Math.round(userDefinedMin * 100) / 100;
      var hasOverValue = tmpMax < tmpValue;
      var progressValue = hasOverValue ? tmpMax : tmpValue;
      var progressMax = hasOverValue ? tmpValue : tmpMax;
      var progressPercentage = Math.round(
        ((tmpValue - progressMin) / (tmpMax - progressMin)) * 100
      );
      var progressWidth = Math.round(
        ((progressValue - progressMin) / (progressMax - progressMin)) * 100
      );
      // ----
      // Build the Class to Define LinearProgress Color
      // ----
      var colorClassName = (function () {
        /** If is discreet, return null */
        if (discreet) {
          return null;
        }
        /** If an appearance color has been declared, it will win on auto color */
        if (appearance) {
          return appearance;
        }
        if (progressPercentage <= lowStep) {
          return inverted ? 'high' : 'low';
        }
        if (progressPercentage > lowStep && progressPercentage <= midLowStep) {
          return inverted ? 'mid-high' : 'mid-low';
        }
        if (
          progressPercentage > midLowStep &&
          progressPercentage <= midHighStep
        ) {
          return 'mid';
        }
        if (
          progressPercentage > midHighStep &&
          progressPercentage <= highStep
        ) {
          return inverted ? 'mid-low' : 'mid-high';
        }
        return inverted ? 'low' : 'high';
      })();
      // ----
      // Build Component Classes and Element Type
      // ----
      var classes = clsx__default['default'](
        reactUiCore.classByKey(hasOverValue, 'overvalued'),
        reactUiCore.classByKey(inverted, 'inverted'),
        'progress',
        reactUiCore.isValue(size),
        reactUiCore.isValue(colorClassName),
        className
      );
      return {
        className: classes,
        progress: {
          max: progressMax,
          min: progressMin,
          overvalued: hasOverValue,
          percentage: progressPercentage,
          rawMax: tmpMax,
          rawValue: tmpValue,
          width: progressWidth,
          value: progressValue,
        },
      };
    },
    [
      props.appearance,
      props.className,
      props.colorSteps,
      props.discreet,
      props.inverted,
      props.max,
      props.min,
      props.size,
      props.value,
    ]
  );
  return _tslib.__assign(_tslib.__assign({}, memoizedProgressProps), {
    rest: rest,
  });
}

module.exports = useProgressProps;
//# sourceMappingURL=useProgressProps.js.map
