import * as React from 'react';

import { getElementType, PropsWithAs } from '@appbuckets/react-ui-core';

import getSharedClassNames, {
  SharedClassNamesAndProps
} from './getSharedClassNames';

import splitStateClassName, { SplitStateClassName } from './splitStateClassName';

import { FontAwesomeIcon, FontAwesomeIconStyle, SharedComponentStateProps } from '../generic';
import getFontawesomeIconClassName from './getFontawesomeIconClassName';


/**
 * Export a function to use the correct
 * element type, wrapped by a react useMemo
 * hook function
 */
export function useElementType<P = {}>(
  Component: React.ComponentType<PropsWithAs<P>>,
  props: PropsWithAs<P>,
  getDefault?: ((props: PropsWithAs<P>) => React.ElementType | undefined)
): React.ElementType | string {
  return React.useMemo(
    () => getElementType(Component, props, getDefault),
    [ props.as, props.href, getDefault ]
  );
}


/**
 * Export a function to use the correct
 * shared className, wrapped by a react useMemo
 */
export function useSharedClassName<P>(props: P): SharedClassNamesAndProps<P> {
  return React.useMemo(
    () => getSharedClassNames(props),
    [ props ]
  );
}


/**
 * Export a function to split the state className
 * from component Props
 */
export function useSplitStateClassName<P>(props: P): SplitStateClassName<P> {
  return React.useMemo(
    () => splitStateClassName(props),
    [
      (props as P & SharedComponentStateProps).appearance,
      (props as P & SharedComponentStateProps).danger,
      (props as P & SharedComponentStateProps).info,
      (props as P & SharedComponentStateProps).primary,
      (props as P & SharedComponentStateProps).secondary,
      (props as P & SharedComponentStateProps).success,
      (props as P & SharedComponentStateProps).warning
    ]
  );
}


/**
 * Export a memoized function to get the right fontawesome class based on name and iconStyle
 */
export function useFontawesomeIcon(name?: FontAwesomeIcon, iconStyle?: FontAwesomeIconStyle): string | null {
  return React.useMemo(
    () => getFontawesomeIconClassName(name, iconStyle),
    [ name, iconStyle ]
  );
}
