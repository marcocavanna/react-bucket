import { ReactNode, PropsWithoutRef, ElementType, ReactElement } from 'react';


/* --------
 * Shorthand Props
 * -------- */
type ShorthandItemFunction<P> = (
  component?: ElementType<P>,
  props?: P,
  children?: ReactNode
) => ReactElement | null;

export type ShorthandContent = ReactNode;
export type ShorthandItem<P> = ReactNode | P | ShorthandItemFunction<P>;
export type ShorthandCollection<P> = ShorthandItem<P>[];


/* --------
 * Component Props Type
 * -------- */
/**
 * Generate a complex ReactBucket Component
 * Props, that could be extended with any key
 */
export type ReactBucketComponentProps<P, E extends keyof JSX.IntrinsicElements = 'div'> =
  StrictReactBucketComponentProps<P, E>
  & { [key: string]: any };

/**
 * Generate a Strict ReactBucket Component
 * Props, extended with children and all Element Attribute
 */
export type StrictReactBucketComponentProps<P, E extends keyof JSX.IntrinsicElements = 'div'> =
  P
  & StructuralReactBucketProps
  & SharedReactBucketProps
  & PropsWithoutRef<JSX.IntrinsicElements[E]>;

/**
 * Generate a Type Dedicated to Flexbox Container
 */
export type FlexboxContainer<P, E extends keyof JSX.IntrinsicElements = 'div'> =
  ReactBucketComponentProps<P, E>
  & SharedFlexboxContainerProps;

/**
 * Generate a Type dedicated to Flexbox Content Element
 */
export type FlexboxContent<P, E extends keyof JSX.IntrinsicElements = 'div'> =
  ReactBucketComponentProps<P, E>
  & SharedFlexboxContentProps;


/**
 * An interface with Structural ReactBucket Props
 */
export interface StructuralReactBucketProps {
  /** An Element used to Render the Component */
  as?: ElementType;

  /** Main Component Content */
  children?: ReactNode;

  /** Content Shorthand */
  content?: ShorthandContent;
}


/**
 * Shared Component props to define style
 */
export interface SharedReactBucketProps {
  /** Choose Main background Color */
  backgroundColor?: ReactBucketColor;

  /** User Defined Class Names */
  className?: string;

  /** Define the main Font Weight */
  fontWeight?: FontWeight;

  /** Change component size */
  size?: ElementSize;

  /** Define Text Align */
  textAlign?: ContentAlign;

  /** Choose main text color */
  textColor?: ReactBucketColor;
}


/**
 * Generate a Type to extends Component Props
 * with useful Flexbox container props
 */
export interface SharedFlexboxContainerProps {
  /** Set content horizontal disposition */
  columnsAlign?: ResponsiveProps<FlexContentHorizontalAlign>;

  /** Set content vertical disposition */
  verticalAlign?: ResponsiveProps<FlexContentVerticalAlign>;

  /** Set if must avoid gutter between columns */
  withoutGap?: ResponsiveProps<boolean>;
}


/**
 * Generate a Type to extends Component Props
 * with useful Flexbox content props
 */
export interface SharedFlexboxContentProps {
  /** Set the base Content Width */
  width?: ResponsiveContentWidth;

  /** Set the Content Offset */
  offsetBy?: ResponsiveContentOffset;

  /** Set the Content Vertical disposition */
  verticalAlign?: ResponsiveProps<FlexContentVerticalAlign>;
}


/* --------
 * Alignment Types
 * -------- */
export type ContentAlign = 'left' | 'center' | 'right';
export type FontWeight = 'light' | 'regular' | 'semi bold' | 'bold';
export type VerticalAlign = 'on top' | 'on bottom' | 'center';


/* --------
 * Size Types
 * -------- */
export type ElementSize = 'extra small' | 'small' | 'normal' | 'large' | 'big' | 'huge';


/* --------
 * Flexbox Grid Types
 * -------- */
export type FlexContentVerticalAlign = VerticalAlign | 'stretched';
export type FlexContentHorizontalAlign = 'on start' | 'centered' | 'on end' | 'spaced between' | 'spaced around';
export type FlexContentOffset =
  1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23';
export type FlexContentWidth = FlexContentOffset | 24 | '24' | 'auto';


/* --------
 * Responsive Properties
 * -------- */
export interface ResponsiveValue<T> {
  /** Set value on phone up screen */
  phoneUp?: T;

  /** Set value on table up screen */
  tabletUp?: T;

  /** Set value on desktop up screen */
  desktopUp?: T;

  /** Set value on large desktop up screen */
  largeDesktopUp?: T;
}

export type ResponsiveProps<T> = T | ResponsiveValue<T>;

export type ResponsiveContentWidth = ResponsiveProps<FlexContentWidth>;
export type ResponsiveContentOffset = ResponsiveProps<FlexContentOffset>;


/* --------
 * Colors Type
 * -------- */
export type BrandColor = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';

export type UIColor =
  'text'
  | 'text tint'
  | 'text shade'
  | 'black'
  | 'black tint'
  | 'white'
  | 'white shade'
  | 'blue'
  | 'teal'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'pink'
  | 'purple'
  | 'grey lightest'
  | 'grey light'
  | 'grey'
  | 'grey dark'
  | 'grey darkest'
  | 'transparent';

export type SocialColor =
  'facebook'
  | 'twitter'
  | 'youtube'
  | 'instagram'
  | 'pinterest'
  | 'linkedin'
  | 'google'
  | 'google-plus'
  | 'whatsapp'
  | 'tumblr'
  | 'apple'
  | 'amazon'
  | 'microsoft'
  | 'vimeo'
  | 'skype'
  | 'android'
  | 'dribble'
  | 'slack'
  | 'yahoo'
  | 'telegram';

export type ReactBucketColor = BrandColor | UIColor | SocialColor;
