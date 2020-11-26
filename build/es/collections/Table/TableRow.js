'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var TableCell = require('./TableCell.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Declare
 * -------- */
var TableRow = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    active = _b.active,
    children = _b.children,
    cellAs = _b.cellAs,
    cells = _b.cells,
    disabled = _b.disabled,
    selectable = _b.selectable,
    rawRest = _tslib.__rest(_b, [
      'active',
      'children',
      'cellAs',
      'cells',
      'content',
      'disabled',
      'selectable',
    ]);
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClassName = _c[0],
    rest = _c[1];
  var ElementType = customHook.useElementType(TableRow, props);
  var classes = clsx__default['default'](
    { active: active, disabled: disabled, selectable: selectable },
    'row',
    stateClassName,
    className
  );
  if (!reactUiCore.childrenUtils.isNil(children)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      children
    );
  }
  var cellsElements =
    Array.isArray(cells) &&
    cells.map(function (cell) {
      return TableCell.create(cell, {
        autoGenerateKey: true,
        defaultProps: { as: cellAs },
      });
    });
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    cellsElements
  );
};
TableRow.displayName = 'TableRow';
TableRow.defaultProps = {
  as: 'tr',
};
TableRow.create = reactUiCore.createShorthandFactory(TableRow, function (
  cells
) {
  return { cells: cells };
});

module.exports = TableRow;
//# sourceMappingURL=TableRow.js.map
