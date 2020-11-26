'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useAutoControlledValue(initialState, config) {
  var _a = config !== null && config !== void 0 ? config : {},
    prop = _a.prop,
    defaultProp = _a.defaultProp;
  var _b = React.useState(
      prop === undefined
        ? defaultProp === undefined
          ? initialState
          : defaultProp
        : prop
    ),
    state = _b[0],
    setState = _b[1];
  // Counterpart to the `static getDerivedStateFromProps` method, but for one key only.
  // When `prop` has changed since last render, update `state` with the `prop`'s value.
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  var getDerivedStateFromProps = React.useCallback(
    function () {
      if (prop === undefined || prop === state) {
        return;
      }
      setState(prop);
    },
    [state, prop, setState]
  );
  // Attempt to modify the `state` value internally.
  // When `prop` has already been provided, defer to it and don't update `state`.
  var trySetState = React.useCallback(
    function (newState) {
      if (prop !== undefined) {
        return;
      }
      setState(newState);
    },
    [prop, setState]
  );
  return [
    prop === undefined ? state : prop,
    trySetState,
    setState,
    getDerivedStateFromProps,
  ];
}

exports.useAutoControlledValue = useAutoControlledValue;
//# sourceMappingURL=useAutoControlledValue.js.map
