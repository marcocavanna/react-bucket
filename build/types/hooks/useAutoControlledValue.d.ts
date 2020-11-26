import * as React from 'react';
export declare type UseAutoControlledValueConfig<State> = {
  /** Control the Props at any Render, use this to get external controls */
  prop?: State;
  /** Initial Value */
  defaultProp?: State;
};
export declare function useAutoControlledValue<State>(
  initialState: State,
  config?: UseAutoControlledValueConfig<State>
): [
  State,
  React.Dispatch<React.SetStateAction<State>>,
  React.Dispatch<React.SetStateAction<State>>,
  () => void
];
