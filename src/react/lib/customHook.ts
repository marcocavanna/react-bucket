import * as React from 'react';

import { getElementType, PropsWithAs } from '@appbuckets/react-ui-core';

import getSharedClassNames, {
  SharedClassNamesAndProps,
  SharedProps
} from './getSharedClassNames';

import splitStateClassName, { SplitStateClassName } from './splitStateClassName';

import { SharedComponentStateProps } from '../generic';


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
    // eslint-disable-next-line
    [
      Component.defaultProps?.as,
      props.as,
      props.href,
      getDefault
    ]
  );
}


/**
 * Export a function to use the correct
 * shared className, wrapped by a react useMemo
 */
export function useSharedClassName<P>(props: P): Readonly<SharedClassNamesAndProps<P>> {

  /** Extract Props used to build shared className string */
  const {
    as,
    backgroundColor,
    className,
    columnsAlign,
    display,
    fontWeight,
    width,
    offsetBy,
    size,
    textAlign,
    textColor,
    verticalAlign,
    withoutGap,
    ...rest
  } = props as P & SharedProps;

  /** Use a memoized value to build classes */
  const classes = React.useMemo(
    (): string => getSharedClassNames({
      backgroundColor,
      className,
      columnsAlign,
      display,
      fontWeight,
      width,
      offsetBy,
      size,
      textAlign,
      textColor,
      verticalAlign,
      withoutGap
    }).className,
    [
      backgroundColor,
      className,
      columnsAlign,
      display,
      fontWeight,
      width,
      offsetBy,
      size,
      textAlign,
      textColor,
      verticalAlign,
      withoutGap
    ]
  );

  /** Return className and rest props */
  return { className: classes, rest } as Readonly<SharedClassNamesAndProps<P>>;
}


/**
 * Export a function to split the state className
 * from component Props
 */
export function useSplitStateClassName<P extends SharedComponentStateProps>(props: P): Readonly<SplitStateClassName<P>> {

  const {
    appearance,
    danger,
    info,
    primary,
    secondary,
    success,
    warning,
    ...rest
  } = props;

  /** Use a memoized value to build classes */
  const [ classes, , state ] = React.useMemo(
    () => splitStateClassName({
      appearance,
      danger,
      info,
      primary,
      secondary,
      success,
      warning
    }),
    [
      appearance,
      danger,
      info,
      primary,
      secondary,
      success,
      warning
    ]
  );

  return [ classes, rest, state ] as unknown as Readonly<SplitStateClassName<P>>;
}
