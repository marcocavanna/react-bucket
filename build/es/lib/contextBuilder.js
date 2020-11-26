'use strict';

var React = require('react');
var invariant = require('tiny-invariant');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var invariant__default = /*#__PURE__*/ _interopDefaultLegacy(invariant);

/* --------
 * Context Builder
 * -------- */
function contextBuilder(initialContext) {
  /** Create the base Context */
  var BaseContext = React.createContext(initialContext);
  /** Init the Hook Function */
  function useContextHook() {
    /** Get the value of the context */
    var ctxValue = React.useContext(BaseContext);
    /** Assert value exists */
    invariant__default['default'](
      ctxValue !== undefined,
      'useContext() hook must be invoked inside its right Context'
    );
    /** Return the Context */
    return ctxValue;
  }
  /** Return context tools */
  return {
    hook: useContextHook,
    Provider: BaseContext.Provider,
    Consumer: BaseContext.Consumer,
  };
}

module.exports = contextBuilder;
//# sourceMappingURL=contextBuilder.js.map
