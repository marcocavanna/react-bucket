'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Column = require('./Column.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Row = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    columns = _b.columns,
    rest = _tslib.__rest(_b, ['children', 'content', 'columns']);
  var ElementType = customHook.useElementType(Row, props);
  var classes = clsx__default['default']('with-columns', className);
  if (Array.isArray(columns)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      columns.map(function (column) {
        return Column.create(column, { autoGenerateKey: true });
      })
    );
  }
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    reactUiCore.childrenUtils.isNil(children) ? content : children
  );
};
Row.displayName = 'Row';

module.exports = Row;
//# sourceMappingURL=Row.js.map
