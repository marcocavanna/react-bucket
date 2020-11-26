'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useInputValue(initialValue) {
  var _a = React.useState({
      raw: initialValue ? String(initialValue) : '',
      casted:
        initialValue !== null && initialValue !== void 0 ? initialValue : null,
    }),
    inputValue = _a[0],
    setInputValue = _a[1];
  var handleInputChange = function (e, props) {
    var _a;
    var value = props.value,
      type = props.type;
    var raw =
      (_a = value === null || value === void 0 ? void 0 : value.toString()) !==
        null && _a !== void 0
        ? _a
        : '';
    switch (type) {
      case 'number':
        var casted = +(value !== null && value !== void 0 ? value : '');
        setInputValue({ raw: raw, casted: casted });
        break;
      default:
        setInputValue({ raw: raw, casted: value });
    }
  };
  return [inputValue.casted, handleInputChange, inputValue.raw];
}

exports.useInputValue = useInputValue;
//# sourceMappingURL=useInputValue.js.map
