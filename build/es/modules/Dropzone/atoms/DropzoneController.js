'use strict';

var React = require('react');
require('../../../elements/Button/ButtonGroup.js');
var Button = require('../../../elements/Button/Button.js');
var Column = require('../../../collections/Grid/Column.js');
require('../../../collections/Grid/Container.js');
var Row = require('../../../collections/Grid/Row.js');
var Divider = require('../../../elements/Divider/Divider.js');
var Dropzone_context = require('../Dropzone.context.js');

/* --------
 * Component Definition
 * -------- */
var DropzoneController = function () {
  var dropzone = Dropzone_context.useDropzone();
  if (!dropzone.files.length) {
    return null;
  }
  var hasFilesToUpload = dropzone.files.some(function (file) {
    return !file.state.success;
  });
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Divider, null),
    React.createElement(
      Row,
      null,
      React.createElement(
        Column,
        { textAlign: 'right' },
        Button.create(dropzone.props.clearButton, {
          autoGenerateKey: false,
          overrideProps: {
            disabled: dropzone.isDisabled,
            onClick: dropzone.clearFiles,
          },
        }),
        Button.create(dropzone.props.uploadButton, {
          autoGenerateKey: false,
          defaultProps: {
            primary: true,
          },
          overrideProps: {
            loading: dropzone.isUploading,
            disabled: dropzone.isDisabled || !hasFilesToUpload,
            onClick: dropzone.startUpload,
          },
        })
      )
    )
  );
};
DropzoneController.displayName = 'DropzoneController';

module.exports = DropzoneController;
//# sourceMappingURL=DropzoneController.js.map
