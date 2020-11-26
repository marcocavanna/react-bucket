'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var React = require('react');
var Dropzone_context = require('../Dropzone.context.js');

/* --------
 * Component Definition
 * -------- */
var DropzoneInput = function (props) {
  var dropzone = Dropzone_context.useDropzone();
  return React.createElement(
    'div',
    { className: 'dropzone-input' },
    React.createElement(
      'input',
      _tslib.__assign({}, props, dropzone.state.getInputProps())
    )
  );
};
DropzoneInput.displayName = 'DropzoneInput';
var DropzoneInput$1 = React.memo(DropzoneInput);

module.exports = DropzoneInput$1;
//# sourceMappingURL=DropzoneInput.js.map
