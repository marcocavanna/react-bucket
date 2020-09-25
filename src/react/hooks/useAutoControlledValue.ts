import * as React from 'react';


export type UseAutoControlledValueConfig<State> = {
  /** Control the Props at any Render, use this to get external controls */
  prop?: State;

  /** Initial Value */
  defaultProp?: State;
};

export function useAutoControlledValue<State>(initialState: State, config?: UseAutoControlledValueConfig<State>): [
  State,
  React.Dispatch<React.SetStateAction<State>>,
  React.Dispatch<React.SetStateAction<State>>,
  () => void
] {

  const { prop, defaultProp } = config ?? {};
  const [ state, setState ] = React.useState(defaultProp === undefined ? initialState : defaultProp);

  // Counterpart to the `static getDerivedStateFromProps` method, but for one key only.
  // When `prop` has changed since last render, update `state` with the `prop`'s value.
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  const getDerivedStateFromProps = React.useCallback(
    () => {
      if (prop === undefined || prop === state) {
        return;
      }

      setState(state);
    },
    [ state, prop, setState ]
  );


  // Automatic change state value based on prop
  React.useEffect(getDerivedStateFromProps, [ prop, setState ]);


  // Attempt to modify the `state` value internally.
  // When `prop` has already been provided, defer to it and don't update `state`.
  const trySetState: React.Dispatch<React.SetStateAction<State>> = React.useCallback(
    (newState) => {
      if (prop !== undefined) {
        return;
      }

      setState(newState);
    },
    [ state, prop, setState ]
  );

  return [
    state,
    trySetState,
    setState,
    getDerivedStateFromProps
  ];
}
