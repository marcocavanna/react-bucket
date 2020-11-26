'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var ReactDropzone = require('react-dropzone');
var processFileUpload = require('./lib/processFileUpload.js');
var readFile = require('./lib/readFile.js');
var Dropzone_context = require('./Dropzone.context.js');
var DropzoneController = require('./atoms/DropzoneController.js');
var DropzoneHint = require('./atoms/DropzoneHint.js');
var DropzoneFiles = require('./atoms/DropzoneFiles.js');
var DropzoneInput = require('./atoms/DropzoneInput.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);
var ReactDropzone__default = /*#__PURE__*/ _interopDefaultLegacy(ReactDropzone);

/* --------
 * Component Render
 * -------- */
var Dropzone = /** @class */ (function (_super) {
  _tslib.__extends(Dropzone, _super);
  function Dropzone() {
    var _a;
    var _this = _super.apply(this, arguments) || this;
    // ----
    // Set initial state
    // ----
    _this.state = {
      files:
        (_a = _this.props.defaultFiles) !== null && _a !== void 0 ? _a : [],
      hasUploadError: false,
      isUploading: false,
    };
    // ----
    // Component Handlers
    // ----
    _this.handleDropFiles = function (acceptedFiles, rejectedFiles) {
      return _tslib.__awaiter(_this, void 0, void 0, function () {
        var isUploading,
          _a,
          onFilesReadError,
          onChange,
          readingPromises,
          readFiles,
          error_1;
        var _this = this;
        return _tslib.__generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              isUploading = this.state.isUploading;
              /** Abort drop and add files while uploading */
              if (isUploading) {
                return [2 /*return*/];
              }
              (_a = this.props),
                (onFilesReadError = _a.onFilesReadError),
                (onChange = _a.onChange);
              readingPromises = [];
              /** Loop each accepted files and get the DropzoneFile */
              acceptedFiles.forEach(function (file) {
                return readingPromises.push(readFile(file));
              });
              readFiles = [];
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3, , 4]);
              return [4 /*yield*/, Promise.all(readingPromises)];
            case 2:
              readFiles = _b.sent();
              return [3 /*break*/, 4];
            case 3:
              error_1 = _b.sent();
              if (onFilesReadError) {
                onFilesReadError(error_1);
              }
              return [3 /*break*/, 4];
            case 4:
              /** Set new Files */
              this.setState(
                {
                  files: readFiles,
                },
                function () {
                  /** Call the onChange handler if exists */
                  if (onChange) {
                    onChange(_this.state.files, rejectedFiles);
                  }
                }
              );
              return [2 /*return*/];
          }
        });
      });
    };
    _this.handleRemoveFiles = function (filesToRemove) {
      /** Get useful props */
      var onChange = _this.props.onChange;
      /** Remap files to keep id only */
      var idsToRemove = filesToRemove.map(function (_a) {
        var id = _a.id;
        return id;
      });
      /** Set new files */
      _this.setState(
        function (curr) {
          return {
            files: curr.files.filter(function (file) {
              return !idsToRemove.includes(file.id);
            }),
          };
        },
        function () {
          /** Call the onChange handler if exists */
          if (onChange) {
            onChange(_this.state.files, []);
          }
        }
      );
    };
    _this.handleClearFiles = function (e) {
      /** Stop Propagation of Click Event */
      if (e) {
        e.stopPropagation();
      }
      /** Get actual State */
      var isUploading = _this.state.isUploading;
      /** Abort drop and add files while uploading */
      if (isUploading) {
        return;
      }
      /** Remove all files */
      _this.handleRemoveFiles(_this.state.files);
    };
    _this.handleDeleteFile = function (file) {
      /** Get actual State */
      var isUploading = _this.state.isUploading;
      /** Abort drop and add files while uploading */
      if (isUploading) {
        return;
      }
      /** Remove single file using internal handler */
      _this.handleRemoveFiles([file]);
    };
    _this.handleEditFile = function (editedFile) {
      /** Get actual State */
      var isUploading = _this.state.isUploading;
      /** Abort drop and add files while uploading */
      if (isUploading) {
        return;
      }
      /** Get useful props */
      var onChange = _this.props.onChange;
      /** Set the new state */
      _this.setState(
        function (curr) {
          return {
            files: curr.files.map(function (file) {
              return file.id === editedFile.id ? editedFile : file;
            }),
          };
        },
        function () {
          /** Call the onChange handler if exists */
          if (onChange) {
            onChange(_this.state.files, []);
          }
        }
      );
    };
    _this.handleSetFilesState = function (filesToChange, state) {
      /** Transform the array into a map object */
      var filesState = filesToChange.reduce(function (states, file) {
        states[file.id] = state;
        return states;
      }, {});
      /** Get useful props */
      var onChange = _this.props.onChange;
      /** Set the new state */
      _this.setState(
        function (curr) {
          return {
            files: curr.files.map(function (file) {
              /** Check if new state exists */
              if (filesState[file.id]) {
                file.state = _tslib.__assign(
                  _tslib.__assign({}, file.state),
                  filesState[file.id]
                );
              }
              return file;
            }),
          };
        },
        function () {
          /** Call the onChange handler if exists */
          if (onChange) {
            onChange(_this.state.files, []);
          }
        }
      );
    };
    _this.handleUploadFiles = function (e) {
      return _tslib.__awaiter(_this, void 0, void 0, function () {
        var _a,
          isUploading,
          files,
          _b,
          onUploadEnd,
          onUpload,
          onUploadError,
          filesToUpload,
          hasError,
          error_2;
        return _tslib.__generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              /** If event exists, invoke come from a button, then must stop propagation */
              if (e) {
                e.stopPropagation();
              }
              (_a = this.state),
                (isUploading = _a.isUploading),
                (files = _a.files);
              /** Abort drop and add files while uploading */
              if (isUploading) {
                return [2 /*return*/];
              }
              (_b = this.props),
                (onUploadEnd = _b.onUploadEnd),
                (onUpload = _b.onUpload),
                (onUploadError = _b.onUploadError);
              /** If no upload function exists, return */
              if (!onUpload) {
                return [2 /*return*/];
              }
              /** Set the uploading state */
              this.setState({
                isUploading: true,
                hasUploadError: false,
              });
              filesToUpload = files.filter(function (file) {
                return !file.state.success;
              });
              hasError = false;
              _c.label = 1;
            case 1:
              _c.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                onUpload(filesToUpload, {
                  removeFiles: this.handleRemoveFiles,
                  setFilesState: this.handleSetFilesState,
                }),
              ];
            case 2:
              _c.sent();
              return [3 /*break*/, 4];
            case 3:
              error_2 = _c.sent();
              hasError = true;
              if (onUploadError) {
                onUploadError(error_2);
              }
              return [3 /*break*/, 4];
            case 4:
              /** Set the state */
              this.setState(
                {
                  isUploading: false,
                  hasUploadError: hasError,
                },
                function () {
                  /** Call the onUploadEnd if exists */
                  if (onUploadEnd) {
                    onUploadEnd(
                      files.filter(function (file) {
                        return file.state.success;
                      })
                    );
                  }
                }
              );
              return [2 /*return*/];
          }
        });
      });
    };
    // ----
    // Internal Dropzone Render Function
    // ----
    _this.renderDropzone = function (state) {
      /** Get actual state */
      var _a = _this.state,
        files = _a.files,
        isUploading = _a.isUploading,
        hasUploadError = _a.hasUploadError;
      /** Get dropzone props */
      var _b = _this.props,
        className = _b.className,
        disabled = _b.disabled,
        multiple = _b.multiple,
        on = _b.on,
        showPreview = _b.showPreview,
        style = _b.style;
      /** Build classes */
      var classes = clsx__default['default'](
        {
          multiple: multiple,
          disabled: disabled,
          clickable:
            (on === null || on === void 0 ? void 0 : on.includes('click')) &&
            !disabled &&
            !files.length,
          draggable:
            (on === null || on === void 0 ? void 0 : on.includes('drop')) &&
            !disabled &&
            !files.length,
          uploading: isUploading,
          dragging: state.isDragActive,
          accepted: state.isDragAccept,
          rejected: state.isDragReject,
          focused: state.isFocused,
        },
        'dropzone',
        {
          'with-files': !!files.length,
          'with-preview': showPreview,
          'with-active-dialog': state.isFileDialogActive,
        },
        className
      );
      /** Build Context */
      var dropzoneContext = {
        clearFiles: _this.handleClearFiles,
        deleteFile: _this.handleDeleteFile,
        editFile: _this.handleEditFile,
        files: files,
        isDisabled: disabled || isUploading,
        isUploading: isUploading,
        hasUploadError: hasUploadError,
        props: _this.props,
        state: state,
        startUpload: _this.handleUploadFiles,
      };
      /** Return the inner component */
      return React.createElement(
        Dropzone_context.DropzoneProvider,
        { value: dropzoneContext },
        React.createElement(
          'div',
          _tslib.__assign({}, files.length ? {} : state.getRootProps(), {
            className: classes,
            style: style,
          }),
          React.createElement(DropzoneInput, null),
          React.createElement(DropzoneHint, null),
          React.createElement(DropzoneFiles, null),
          React.createElement(DropzoneController, null)
        )
      );
    };
    return _this;
  }
  // ----
  // Main Component Render Function
  // ----
  Dropzone.prototype.render = function () {
    /** Get configuration props */
    var _a = this.props,
      accept = _a.accept,
      disabled = _a.disabled,
      maxFiles = _a.maxFiles,
      maxSize = _a.maxSize,
      minSize = _a.minSize,
      multiple = _a.multiple,
      on = _a.on;
    /** Get current state */
    var isUploading = this.state.isUploading;
    return React.createElement(
      ReactDropzone__default['default'],
      {
        accept: accept,
        disabled: disabled || isUploading,
        maxFiles: multiple ? maxFiles : 1,
        maxSize: maxSize,
        minSize: minSize,
        noClick: !(on === null || on === void 0
          ? void 0
          : on.includes('click')),
        noDrag: !(on === null || on === void 0 ? void 0 : on.includes('drop')),
        onDrop: this.handleDropFiles,
      },
      this.renderDropzone
    );
  };
  Dropzone.processFileUpload = processFileUpload;
  // ----
  // Set the Display Name
  // ----
  Dropzone.displayName = 'Dropzone';
  // ----
  // Assign Default Props
  // ----
  Dropzone.defaultProps = {
    clearButton: {
      content: 'Clear',
    },
    editItemTool: {
      icon: 'edit',
      flat: false,
    },
    hintOnIdle: 'Choose or Drag Files',
    hintTitle: 'File Upload',
    hintWhileDisabled: 'Upload Disabled',
    hintWhileDragging: 'Release file to Upload',
    iconOnDragging: 'file download',
    iconOnIdle: 'cloud upload alt',
    maxFiles: 10,
    multiple: true,
    on: ['click', 'drop'],
    removeItemTool: {
      icon: 'times circle',
      danger: true,
      flat: false,
    },
    uploadButton: {
      content: 'Upload',
    },
  };
  return Dropzone;
})(React.Component);

module.exports = Dropzone;
//# sourceMappingURL=Dropzone.js.map
