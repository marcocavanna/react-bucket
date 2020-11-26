'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useCheckboxValue(initialValue) {
  var _a = React.useState(initialValue),
    checked = _a[0],
    setChecked = _a[1];
  var handleCheckboxChange = React.useCallback(function (e, props) {
    setChecked(props.checked);
  }, []);
  return [
    checked !== null && checked !== void 0 ? checked : false,
    handleCheckboxChange,
    setChecked,
  ];
}

exports.useCheckboxValue = useCheckboxValue;
//# sourceMappingURL=useCheckboxValue.js.map
