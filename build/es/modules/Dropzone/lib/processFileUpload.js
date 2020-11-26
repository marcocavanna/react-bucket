'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var PQueue = require('p-queue');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var PQueue__default = /*#__PURE__*/ _interopDefaultLegacy(PQueue);

function processFileUpload(handler, config) {
  var _a = config !== null && config !== void 0 ? config : {},
    _b = _a.autoControlFileState,
    autoControlFileState = _b === void 0 ? true : _b,
    _c = _a.autoRemoveUploadedTimeout,
    autoRemoveUploadedTimeout = _c === void 0 ? 1000 : _c,
    _d = _a.concurrency,
    concurrency = _d === void 0 ? 3 : _d,
    onFileUploadEnd = _a.onFileUploadEnd,
    onFileUploadError = _a.onFileUploadError;
  return function uploadFiles(files, helpers) {
    return _tslib.__awaiter(this, void 0, void 0, function () {
      var queue;
      return _tslib.__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            queue = new PQueue__default['default']({
              concurrency: concurrency,
            });
            files.forEach(function (file) {
              queue.add(function () {
                return new Promise(function (resolve) {
                  /** Set file uploading */
                  if (autoControlFileState) {
                    helpers.setFilesState([file], {
                      isUploading: true,
                      error: false,
                      success: false,
                    });
                  }
                  /** Call the handler */
                  handler(file, helpers)
                    .then(function () {
                      /** Set the new file state */
                      if (autoControlFileState) {
                        helpers.setFilesState([file], {
                          isUploading: false,
                          error: false,
                          success: true,
                        });
                        if (autoRemoveUploadedTimeout) {
                          setTimeout(function () {
                            helpers.removeFiles([file]);
                          }, autoRemoveUploadedTimeout);
                        }
                      }
                      /** Call the onUploadEnd handler */
                      if (onFileUploadEnd) {
                        onFileUploadEnd(file, helpers);
                      }
                      /** Resolve the queue task */
                      return resolve();
                    })
                    .catch(function () {
                      /** Set the new file state */
                      if (autoControlFileState) {
                        helpers.setFilesState([file], {
                          isUploading: false,
                          error: true,
                          success: false,
                        });
                      }
                      /** Call the onUploadError handler */
                      if (onFileUploadError) {
                        onFileUploadError(file, helpers);
                      }
                      /** Resolve the task anyway */
                      return resolve();
                    });
                });
              });
            });
            /** Await the queue idle */
            return [4 /*yield*/, queue.onIdle()];
          case 1:
            /** Await the queue idle */
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
}

module.exports = processFileUpload;
//# sourceMappingURL=processFileUpload.js.map
