import * as React from 'react';
import deepExtend from 'deep-extend';
import clsx from 'clsx';

import realyFastDeepClone from 'rfdc';

import { contextBuilder } from '../lib';

import {
  BucketThemeContext,
  ThemeOptions,
  PartialThemeOptions
} from './BucketContext.types';

import { defaultBucketThemeConfig } from './BucketTheme.default';


/* --------
 * Build the Deep Clone Function
 * -------- */
const deepClone = realyFastDeepClone();


/* --------
 * Prebuild the Context
 * -------- */
const {
  Provider: BucketThemeProvider,
  hook    : useBucketTheme
} = contextBuilder<BucketThemeContext>();


/* --------
 * Prebuild a Component that will initialize the Bucket Theme
 * -------- */
const BucketTheme: React.FunctionComponent<{ theme?: PartialThemeOptions }> = (
  props
) => {

  /** Get the user defined theme configuration */
  const {
    children,
    theme: userDefinedTheme
  } = props;

  /** Merge theme with default theme configuration */
  const theme: ThemeOptions = deepExtend(defaultBucketThemeConfig, userDefinedTheme);

  /** Create the Context Provider element and render with children */
  return (
    <BucketThemeProvider value={{ theme }}>
      {children}
    </BucketThemeProvider>
  );

};

BucketTheme.displayName = 'BucketTheme';


/* --------
 * Define an Hook to get Theme Options
 * -------- */
export function useComponentProps<C extends keyof ThemeOptions>(componentName: C): ThemeOptions[C] {
  /** Get the theme */
  const {
    theme: { [componentName]: componentProps }
  } = useBucketTheme();

  return React.useMemo(
    () => deepClone(componentProps),
    [ componentProps ]
  );
}

export function useWithDefaultProps<C extends keyof ThemeOptions, Props extends ThemeOptions[C]>(
  componentName: C,
  props: React.PropsWithChildren<Props>
): React.PropsWithChildren<Props> {

  /** Get the Theme Component Props */
  const componentProps = useComponentProps(componentName);

  /** Produce props unions */
  const propsUnions = { ...componentProps, ...props };

  /** Merge classNames */
  if ((componentProps as any).className || (props as any).className) {
    (propsUnions as any).className = clsx(
      (componentProps as any).className,
      (props as any).className
    );
  }

  /** Merge style */
  if ((componentProps as any).style || (props as any).style) {
    (propsUnions as any).style = {
      ...(componentProps as any).style,
      ...(props as any).style
    };
  }

  return propsUnions;
}

export function withDefaultProps<C extends keyof ThemeOptions, Props extends {}>(
  componentName: C,
  Component: React.ComponentType<Props>
): React.FunctionComponent<Props> {
  return (receivedProps) => {
    /** Merge props with default */
    const props = useWithDefaultProps(componentName, receivedProps);
    /** Return the Component */
    return (
      <Component
        {...props}
      />
    );
  };
}


/* --------
 * Complete Module Export
 * -------- */
export {
  BucketTheme
};
