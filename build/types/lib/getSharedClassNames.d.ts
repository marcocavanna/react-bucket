import {
  SharedReactBucketProps,
  SharedFlexboxContainerProps,
  SharedFlexboxContentProps,
} from '../generic';
export declare type SharedProps = SharedReactBucketProps &
  SharedFlexboxContentProps &
  SharedFlexboxContainerProps & {
    as?: any;
    className?: string;
  };
export declare type SharedClassNamesAndProps<P> = {
  /** Computed Class Names */
  className: string;
  /** Other Component Props */
  rest: {
    [K in keyof P]: K extends keyof SharedProps ? never : P[K];
  };
};
export default function getSharedClassNames<P extends SharedProps>(
  props: P
): SharedClassNamesAndProps<P>;
