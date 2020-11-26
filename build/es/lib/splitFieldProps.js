'use strict';

var fieldPropsKey = [
  'actions',
  'actionsPosition',
  'clearable',
  'contentClassName',
  'contentType',
  'disabled',
  'hint',
  'hintClassName',
  'icon',
  'iconPosition',
  'isDirty',
  'isFocused',
  'isTouched',
  'label',
  'onClear',
  'readOnly',
  'required',
];
function splitFieldProps(props) {
  var fieldProps = {};
  var rest = {};
  Object.keys(props).forEach(function (propKey) {
    if (fieldPropsKey.includes(propKey)) {
      fieldProps[propKey] = props[propKey];
    } else {
      rest[propKey] = props[propKey];
    }
  });
  return [fieldProps, rest];
}

module.exports = splitFieldProps;
//# sourceMappingURL=splitFieldProps.js.map
