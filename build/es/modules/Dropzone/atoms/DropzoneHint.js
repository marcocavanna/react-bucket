'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var React = require('react');
var EmptyContent = require('../../../elements/EmptyContent/EmptyContent.js');
var Dropzone_context = require('../Dropzone.context.js');

/* --------
 * Component Definition
 * -------- */
var DropzoneHint = function (props) {
  /** Get the Context */
  var dropzone = Dropzone_context.useDropzone();
  if (dropzone.files.length) {
    return null;
  }
  return React.createElement(
    EmptyContent,
    _tslib.__assign({}, props, {
      className: 'dropzone-hint',
      icon: dropzone.state.isDragActive
        ? dropzone.props.iconOnDragging
        : dropzone.props.iconOnIdle,
      header: dropzone.props.hintTitle,
      content: dropzone.isDisabled
        ? dropzone.props.hintWhileDisabled
        : dropzone.state.isDragActive
        ? dropzone.props.hintWhileDragging
        : dropzone.props.hintOnIdle,
    })
  );
};
DropzoneHint.displayName = 'DropzoneHint';

module.exports = DropzoneHint;
//# sourceMappingURL=DropzoneHint.js.map
