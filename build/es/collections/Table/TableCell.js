'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var TableCellContent = require('./TableCellContent.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var TableCell = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    active = _b.active,
    children = _b.children,
    content = _b.content,
    header = _b.header,
    meta = _b.meta,
    selectable = _b.selectable,
    wrapped = _b.wrapped,
    rawRest = _tslib.__rest(_b, [
      'active',
      'children',
      'content',
      'header',
      'meta',
      'selectable',
      'wrapped',
    ]);
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClassName = _c[0],
    rest = _c[1];
  var ElementType = customHook.useElementType(TableCell, props);
  var classes = clsx__default['default'](
    { active: active, selectable: selectable, wrapped: wrapped },
    'cell',
    className,
    stateClassName
  );
  // ----
  // Generate Memoized Shorthand Content
  // ----
  var metaElement = React.useMemo(
    function () {
      return TableCellContent.create(meta, {
        autoGenerateKey: false,
        overrideProps: { type: 'meta' },
      });
    },
    [meta]
  );
  var titleElement = React.useMemo(
    function () {
      return TableCellContent.create(header, {
        autoGenerateKey: false,
        overrideProps: { type: 'title' },
      });
    },
    [header]
  );
  var contentElement = React.useMemo(
    function () {
      return TableCellContent.create(content, {
        autoGenerateKey: false,
        overrideProps: { type: 'content' },
      });
    },
    [content]
  );
  // ----
  // Render Children
  // ----
  if (!reactUiCore.childrenUtils.isNil(children)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      children
    );
  }
  // ----
  // Render Using Shorthand
  // ----
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    metaElement,
    titleElement,
    contentElement
  );
};
TableCell.displayName = 'TableCell';
TableCell.defaultProps = {
  as: 'td',
};
TableCell.Content = TableCellContent;
TableCell.create = reactUiCore.createShorthandFactory(TableCell, function (
  content
) {
  return { header: content };
});

module.exports = TableCell;
//# sourceMappingURL=TableCell.js.map
