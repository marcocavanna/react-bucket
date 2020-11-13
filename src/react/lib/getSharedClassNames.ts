import clsx from 'clsx';

import {
  classByPattern,
  isValue
} from '@appbuckets/react-ui-core';

import {
  SharedReactBucketProps,
  SharedFlexboxContainerProps,
  SharedFlexboxContentProps,
  ResponsiveProps
} from '../generic';


export type SharedProps =
  SharedReactBucketProps
  & SharedFlexboxContentProps
  & SharedFlexboxContainerProps
  & { as?: any, className?: string };

export type SharedClassNamesAndProps<P> = {
  /** Computed Class Names */
  className: string;
  /** Other Component Props */
  rest: Pick<P, Exclude<keyof P, keyof SharedProps>>
};


function fallBackTrueValue(original: any): string | undefined {
  if (original === true) {
    return 'true';
  }
  return original;
}

/**
 * Some prop can be responsive, so can be computed
 * differently if they are primitive, or an object of value
 *
 * @param prop Prop to Compute
 * @param pattern Pattern to Use to build className
 */
function computeResponsiveClassName(
  prop: ResponsiveProps<any>,
  pattern: string
): string | undefined {
  // Assert prop is a valid computable prop
  if (prop == null || prop === false) {
    return undefined;
  }

  // If prop is not an object, return as master class
  if (typeof prop !== 'object') {
    return classByPattern(fallBackTrueValue(prop), pattern);
  }

  return clsx(
    classByPattern(fallBackTrueValue(prop.phoneUp), `on-phone-${pattern}`),
    classByPattern(fallBackTrueValue(prop.tabletUp), `on-tablet-${pattern}`),
    classByPattern(fallBackTrueValue(prop.desktopUp), `on-desktop-${pattern}`),
    classByPattern(fallBackTrueValue(prop.largeDesktopUp), `on-large-desktop-${pattern}`)
  );
}

export default function getSharedClassNames<P extends SharedProps>(props: P): SharedClassNamesAndProps<P> {

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
  } = props;

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
    computeResponsiveClassName(display, 'is-%value%'),
    computeResponsiveClassName(width, 'is-%value%'),
    computeResponsiveClassName(offsetBy, 'offset-by-%value%'),
    computeResponsiveClassName(verticalAlign, '%value%'),
    computeResponsiveClassName(withoutGap, 'without-gap'),
    // User defined classes
    className
  );

  return { className: classes, rest };
}
