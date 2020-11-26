'use strict';

var mimeTypeToIcon = require('./mimeTypeToIcon.js');

function readFile(file) {
  return new Promise(function (resolve) {
    /** Create the base Dropzone File */
    var dropzoneFile = {
      blob: file,
      height: 0,
      icon: mimeTypeToIcon(file.type),
      id: (Date.now() + Math.random() * 1000).toString(36),
      isImage: /^image\//.test(file.type),
      name: file.name,
      originalName: file.name,
      preview: null,
      readError: false,
      size: file.size,
      state: {
        error: false,
        isUploading: false,
        success: false,
      },
      type: file.type,
      width: 0,
    };
    /** If file is not an image, return */
    if (!dropzoneFile.isImage) {
      return resolve(dropzoneFile);
    }
    /** Else, read the image */
    var reader = new FileReader();
    /** Init an handler to abort the reader */
    var handleAbortRead = function () {
      dropzoneFile.readError = true;
      return resolve(dropzoneFile);
    };
    /** Attach events to file reader */
    reader.onabort = handleAbortRead;
    reader.onerror = handleAbortRead;
    reader.onload = function (event) {
      var _a, _b, _c;
      /** Set the preview */
      dropzoneFile.preview =
        (_c =
          (_b =
            (_a = event.target) === null || _a === void 0
              ? void 0
              : _a.result) === null || _b === void 0
            ? void 0
            : _b.toString()) !== null && _c !== void 0
          ? _c
          : null;
      /** Read the image to get its dimension */
      if (event.target && typeof event.target.result === 'string') {
        var image_1 = new Image();
        image_1.src = event.target.result;
        image_1.onload = function () {
          dropzoneFile.height = image_1.height;
          dropzoneFile.width = image_1.width;
          return resolve(dropzoneFile);
        };
      } else {
        return resolve(dropzoneFile);
      }
    };
    /** Read the file */
    reader.readAsDataURL(file);
  });
}

module.exports = readFile;
//# sourceMappingURL=readFile.js.map
