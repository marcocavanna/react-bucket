'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var TableCellContent = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    type = _b.type,
    truncate = _b.truncate,
    rest = _tslib.__rest(_b, ['children', 'content', 'type', 'truncate']);
  var ElementType = customHook.useElementType(TableCellContent, props);
  var classes = clsx__default['default'](
    truncate && 'truncated',
    type,
    className
  );
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    reactUiCore.childrenUtils.isNil(children) ? content : children
  );
};
TableCellContent.displayName = 'CellContent';
TableCellContent.defaultProps = {
  as: 'p',
  type: 'content',
};
TableCellContent.create = reactUiCore.createShorthandFactory(
  TableCellContent,
  function (content) {
    return { content: content };
  }
);

module.exports = TableCellContent;
//# sourceMappingURL=TableCellContent.js.map
