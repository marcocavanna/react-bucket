'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var React = require('react');
var Input = require('../../../elements/Input/Input.js');
var Item = require('../../../elements/Item/Item.js');
var Dropzone_context = require('../Dropzone.context.js');
var prettyBytes = require('pretty-bytes');
var useInputValue = require('../../../hooks/useInputValue.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var prettyBytes__default = /*#__PURE__*/ _interopDefaultLegacy(prettyBytes);

/* --------
 * Internal Component
 * -------- */
var DropzoneFileItem = function (props) {
  var file = props.file;
  // ----
  // State and Hook declaration
  // ----
  var _a = useInputValue.useInputValue(file.name),
    newItemName = _a[0],
    handleItemNameChange = _a[1];
  var _b = React.useState(false),
    isEditing = _b[0],
    setIsEditing = _b[1];
  var dropzone = Dropzone_context.useDropzone();
  // ----
  // Remove the isEditing state on upload
  // ----
  React.useEffect(
    function () {
      if (dropzone.isUploading) {
        setIsEditing(false);
      }
    },
    [dropzone.isUploading]
  );
  // ----
  // Handlers
  // ----
  var handleEditStart = React.useCallback(
    function () {
      setIsEditing(true);
    },
    [setIsEditing]
  );
  var handleEditEnd = React.useCallback(
    function () {
      /** Save the new Item name */
      dropzone.editFile(
        _tslib.__assign(_tslib.__assign({}, file), {
          name: newItemName.length ? newItemName : file.name,
        })
      );
      setIsEditing(false);
    },
    [dropzone, file, newItemName, setIsEditing]
  );
  var handleFileRemove = React.useCallback(
    function () {
      dropzone.deleteFile(file);
    },
    [dropzone, file]
  );
  // ----
  // Memoized Parts
  // ----
  var itemHeader = React.useMemo(
    function () {
      if (!isEditing) {
        return file.name;
      }
      return React.createElement(Input, {
        autoFocus: true,
        selectAllOnClick: true,
        value: newItemName,
        onChange: handleItemNameChange,
        actions: [
          {
            key: 1,
            disabled: !newItemName,
            icon: 'check',
            success: true,
            onClick: handleEditEnd,
          },
        ],
      });
    },
    [isEditing, file.name, newItemName, handleItemNameChange, handleEditEnd]
  );
  // ----
  // Component Render
  // ----
  return React.createElement(Item, {
    centered: true,
    loading: file.state.isUploading,
    disabled: dropzone.isUploading || file.state.success,
    primary: file.state.isUploading,
    danger: file.state.error,
    success: file.state.success,
    avatar: {
      icon: file.state.isUploading
        ? 'sync'
        : file.state.error
        ? 'times'
        : file.state.success
        ? 'check'
        : file.icon,
      type: 'square',
    },
    header: itemHeader,
    content: !isEditing
      ? prettyBytes__default['default'](file.size)
      : undefined,
    tools: [
      dropzone.props.editItemTool &&
        !isEditing &&
        _tslib.__assign(_tslib.__assign({}, dropzone.props.editItemTool), {
          key: 0,
          onClick: handleEditStart,
        }),
      dropzone.props.removeItemTool &&
        _tslib.__assign(_tslib.__assign({}, dropzone.props.removeItemTool), {
          key: 1,
          onClick: handleFileRemove,
        }),
    ],
  });
};
/* --------
 * Component Definition
 * -------- */
var DropzoneFiles = function () {
  var dropzone = Dropzone_context.useDropzone();
  if (!dropzone.files.length) {
    return null;
  }
  return React.createElement(
    Item.Group,
    { relaxed: true, divided: true },
    dropzone.files.map(function (file) {
      return React.createElement(DropzoneFileItem, {
        key: file.id,
        file: file,
      });
    })
  );
};
DropzoneFiles.displayName = 'DropzoneFiles';

module.exports = DropzoneFiles;
//# sourceMappingURL=DropzoneFiles.js.map
