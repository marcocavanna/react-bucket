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
var LinearProgress = function (props) {
  var _a = useProgressProps(props),
    className = _a.className,
    progress = _a.progress,
    _b = _a.rest,
    as = _b.as,
    children = _b.children,
    content = _b.content,
    indicator = _b.indicator,
    limits = _b.limits,
    reverse = _b.reverse,
    rest = _tslib.__rest(_b, [
      'as',
      'children',
      'content',
      'indicator',
      'limits',
      'reverse',
    ]);
  var ElementType = customHook.useElementType(LinearProgress, props);
  // ----
  // Build Indicator Element
  // ----
  var indicatorElement = useProgressIndicator(indicator, progress);
  // ----
  // Build Limits Element
  // ----
  var downLimit =
    limits &&
    (typeof limits === 'function' ? limits(progress.min) : progress.min);
  var upLimit =
    limits &&
    (typeof limits === 'function'
      ? limits(progress.overvalued ? progress.value : progress.max)
      : progress.overvalued
      ? progress.value
      : progress.max);
  var overValueLimit =
    progress.overvalued &&
    limits &&
    (typeof limits === 'function' ? limits(progress.max) : progress.max);
  var limitsElement = React.useMemo(
    function () {
      if (!limits) {
        return null;
      }
      return React.createElement(
        'div',
        { className: 'limits' },
        React.createElement(
          'div',
          {
            className: 'value',
            style: {
              width: (progress.overvalued ? progress.width : 100) + '%',
            },
          },
          React.createElement('div', { className: 'down' }, downLimit),
          React.createElement('div', { className: 'up' }, upLimit)
        ),
        overValueLimit &&
          React.createElement('div', { className: 'overvalue' }, overValueLimit)
      );
    },
    [
      limits,
      progress.overvalued,
      progress.width,
      downLimit,
      upLimit,
      overValueLimit,
    ]
  );
  var classes = clsx__default['default'](
    className,
    {
      reverse: reverse,
      'with-limits': limitsElement,
      'with-indicator': indicatorElement,
    },
    'linear'
  );
  var contentElement = reactUiCore.childrenUtils.isNil(children)
    ? content
    : children;
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    limitsElement,
    React.createElement(
      'div',
      { className: 'bar' },
      React.createElement(
        'div',
        { className: 'value', style: { width: progress.width + '%' } },
        indicatorElement
      )
    ),
    contentElement &&
      React.createElement('div', { className: 'content' }, contentElement)
  );
};
LinearProgress.displayName = 'LinearProgress';
LinearProgress.defaultProps = {
  max: 100,
  min: 0,
};
LinearProgress.create = reactUiCore.createShorthandFactory(
  LinearProgress,
  function (value) {
    return { value: value };
  }
);

module.exports = LinearProgress;
//# sourceMappingURL=LinearProgress.js.map
