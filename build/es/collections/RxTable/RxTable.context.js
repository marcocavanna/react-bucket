'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
require('clsx');
require('@appbuckets/react-ui-core');
var contextBuilder = require('../../lib/contextBuilder.js');

/* --------
 * Context Building
 * -------- */
var _a = contextBuilder(),
  defaultUseRxTable = _a.hook,
  RxTableProvider = _a.Provider;
function useRxTable() {
  return defaultUseRxTable();
}

exports.RxTableProvider = RxTableProvider;
exports.useRxTable = useRxTable;
//# sourceMappingURL=RxTable.context.js.map
