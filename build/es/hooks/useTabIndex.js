'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useTabIndex(config) {
  return React.useMemo(
    function () {
      if (config.prop !== undefined) {
        return config.prop;
      }
      if (config.disabled || config.readOnly) {
        return -1;
      }
      return undefined;
    },
    [config.prop, config.disabled, config.readOnly]
  );
}

exports.useTabIndex = useTabIndex;
//# sourceMappingURL=useTabIndex.js.map
