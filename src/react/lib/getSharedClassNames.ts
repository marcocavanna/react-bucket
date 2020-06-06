import clsx from 'clsx';

import {
  // classByKey,
  classByPattern,
  // classByValue,
  isValue
} from '@appbuckets/react-ui-core';

import {
  SharedRBProps,
  SharedFlexboxContainerProps,
  SharedFlexboxContentProps,
  ResponsiveProps
} from '../generic';


export type SharedProps = SharedRBProps & SharedFlexboxContentProps & SharedFlexboxContainerProps;

export type SharedClassNamesAndProps<P> = {
  /** Computed Class Names */
  className: string;
  /** Other Component Props */
  rest: Omit<P, keyof SharedProps>
};


/**
 * Some prop can be responsive, so can be computed
 * differently if they are primitive, or an object of value
 *
 * @param prop Prop to Compute
 * @param pattern Pattern to Use to build className
 */
function computeResponsiveClassName(prop: ResponsiveProps<any>, pattern: string): string | undefined {
  // Assert prop is a valid computable prop
  if (prop == null || typeof prop === 'boolean') {
    return undefined;
  }

  // If prop is not an object, return as master class
  if (typeof prop !== 'object') {
    return classByPattern(prop, pattern);
  }

  return clsx(
    classByPattern(prop.phoneUp, `on-phone-${pattern}`),
    classByPattern(prop.tabletUp, `on-tablet-${pattern}`),
    classByPattern(prop.desktopUp, `on-desktop-${pattern}`),
    classByPattern(prop.largeDesktopUp, `on-large-desktop-${pattern}`)
  );
}

export default function getSharedClassNames<P>(props: P): SharedClassNamesAndProps<P> {

  const {
    backgroundColor,
    className,
    columnsAlign,
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

  // Build Classes
  const classes = clsx(
    // The background color
    classByPattern(backgroundColor, 'has-background-%value%'),
    // Main text Color
    classByPattern(textColor, 'has-text-%value%'),
    // Main font weight
    classByPattern(fontWeight, 'has-font-%value%'),
    // Content Size
    isValue(size),
    // Text Align
    classByPattern(textAlign, 'has-text-%value%'),
    // Responsive Props
    computeResponsiveClassName(columnsAlign, '%value%'),
    computeResponsiveClassName(width, 'is-%value%'),
    computeResponsiveClassName(offsetBy, 'offset-by-%value%'),
    computeResponsiveClassName(verticalAlign, '%value%'),
    computeResponsiveClassName(withoutGap, 'without-gap'),
    // User defined classes
    className
  );

  return { className: classes, rest };
}
