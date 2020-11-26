import * as React from 'react';
import { PropsWithAs } from '@appbuckets/react-ui-core';
import { SharedClassNamesAndProps } from './getSharedClassNames';
import { SplitStateClassName } from './splitStateClassName';
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
  SharedComponentStateProps,
} from '../generic';
/**
 * Export a function to use the correct
 * element type, wrapped by a react useMemo
 * hook function
 */
export declare function useElementType<P = {}>(
  Component: React.ComponentType<PropsWithAs<P>>,
  props: PropsWithAs<P>,
  getDefault?: (props: PropsWithAs<P>) => React.ElementType | undefined
): React.ElementType | string;
/**
 * Export a function to use the correct
 * shared className, wrapped by a react useMemo
 */
export declare function useSharedClassName<P>(
  props: P
): Readonly<SharedClassNamesAndProps<P>>;
/**
 * Export a function to split the state className
 * from component Props
 */
export declare function useSplitStateClassName<
  P extends SharedComponentStateProps
>(props: P): Readonly<SplitStateClassName<P>>;
/**
 * Export a memoized function to get the right fontawesome class based on name and iconStyle
 */
export declare function useFontawesomeIcon(
  name?: FontAwesomeIcon,
  iconStyle?: FontAwesomeIconStyle
): string | null;
