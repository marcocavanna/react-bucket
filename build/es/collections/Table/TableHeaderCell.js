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
 * Component Render
 * -------- */
var TableHeaderCell = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    sortable = _b.sortable,
    sorted = _b.sorted,
    rest = _tslib.__rest(_b, ['sortable', 'sorted']);
  var classes = clsx__default['default'](
    className,
    sorted && 'sorted',
    reactUiCore.classByValue(sorted),
    sortable && 'sortable'
  );
  return React.createElement(
    TableCell,
    _tslib.__assign({}, rest, { as: props.as, className: classes })
  );
};
TableHeaderCell.displayName = 'TableHeaderCell';
TableHeaderCell.defaultProps = {
  as: 'th',
};
TableHeaderCell.create = reactUiCore.createShorthandFactory(
  TableHeaderCell,
  function (content) {
    return { header: content };
  }
);

module.exports = TableHeaderCell;
//# sourceMappingURL=TableHeaderCell.js.map
