import { SharedComponentStateProps } from '../generic';
export declare type SplitStateClassName<P> = [
  string,
  {
    [K in keyof P]: K extends keyof SharedComponentStateProps ? never : P[K];
  },
  SharedComponentStateProps
];
export default function splitStateClassName<
  P extends SharedComponentStateProps
>(props: P): SplitStateClassName<P>;
