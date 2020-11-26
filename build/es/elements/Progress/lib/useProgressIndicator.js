'use strict';

var React = require('react');

function useProgressIndicator(indicator, progress) {
  var indicatorValue =
    indicator &&
    (typeof indicator === 'string' || indicator === true
      ? indicator === 'percent'
        ? progress.percentage + '%'
        : progress.rawValue + '/' + progress.rawMax
      : indicator(progress.rawValue));
  return React.useMemo(
    function () {
      if (!indicator) {
        return null;
      }
      return React.createElement(
        'div',
        { className: 'indicator' },
        indicatorValue
      );
    },
    [indicatorValue]
  );
}

module.exports = useProgressIndicator;
//# sourceMappingURL=useProgressIndicator.js.map
