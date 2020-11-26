'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var clsx = require('clsx');
var areEqualStringArray = require('./lib/areEqualStringArray.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Header Title Column Component Definition
 * -------- */
var RxTableHeaderTitleColumn = function (props) {
  var column = props.column,
    Component = props.Component,
    isSortReversed = props.isSortReversed,
    onSortChange = props.onSortChange,
    tableSorting = props.tableSorting;
  /** Compute memoized sorting props */
  var sorting = React.useMemo(
    function () {
      var isSortable = Array.isArray(column.sort) && !!column.sort.length;
      return {
        isSortable: isSortable,
        isSorted: isSortable && areEqualStringArray(tableSorting, column.sort),
      };
    },
    [column.sort, tableSorting]
  );
  /** Build classes */
  var classes = clsx__default['default'](
    column.textAlign && 'has-text-' + column.textAlign,
    column.headerClassName
  );
  /** Handle Sorting Change */
  var handleSortChange = React.useCallback(
    function () {
      if (!sorting.isSortable) {
        return;
      }
      if (sorting.isSorted) {
        onSortChange(column.sort, !isSortReversed);
      } else {
        onSortChange(column.sort, false);
      }
    },
    [
      column.sort,
      isSortReversed,
      onSortChange,
      sorting.isSortable,
      sorting.isSorted,
    ]
  );
  return React.createElement(Component, {
    className: classes,
    column: column,
    content: column.header,
    hasSorting: sorting.isSortable,
    isActualSortingColumn: sorting.isSorted,
    isReversedSorting: sorting.isSorted && isSortReversed,
    onClick: sorting.isSortable ? handleSortChange : undefined,
  });
};
RxTableHeaderTitleColumn.displayName = 'RxTableHeaderTitleColumn';

exports.RxTableHeaderTitleColumn = RxTableHeaderTitleColumn;
//# sourceMappingURL=RxTableColumns.js.map
