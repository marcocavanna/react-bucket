import {
  ReactNode,
  ReactElement,
  ComponentClass,
  FunctionComponent,
  Key,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
} from 'react';
import {
  CreateShorthandOptions,
  ShorthandValue,
  ShorthandRenderFunctionValue,
} from '@appbuckets/react-ui-core';
import { FontAwesomeIcon } from './fontawesome';
/** Re export ReactBucket Icon */
export { FontAwesomeIcon, FontAwesomeIconStyle } from './fontawesome';
/** Generic Object */
export declare type AnyObject = {
  [key: string]: any;
};
export declare type ShorthandContent = ReactNode;
export declare type ShorthandItem<P> =
  | ReactNode
  | P
  | ShorthandRenderFunctionValue<P>;
export declare type ShorthandCollection<P> = ShorthandItem<
  P & {
    key: Key;
  }
>[];
export declare type CreateComponentFactory<P> = {
  create: (
    value: ShorthandValue<P> | ShorthandRenderFunctionValue<P>,
    options: CreateShorthandOptions<P>
  ) => ReactElement<P> | null;
};
export declare type CreatableFunctionComponent<P> = FunctionComponent<P> &
  CreateComponentFactory<P>;
export declare type ReactBucketIcon<T> = FontAwesomeIcon | ShorthandItem<T>;
/**
 * Generate a complex ReactBucket Component
 * Props, that could be extended with any key
 */
export declare type ReactBucketComponentProps<
  P,
  E extends keyof JSX.IntrinsicElements = 'div'
> = MinimalReactBucketComponentProps<P, E> & SharedReactBucketProps & AnyObject;
/**
 * Generate a minimal ReactBucket Component
 * including only structural props
 */
export declare type MinimalReactBucketComponentProps<
  P,
  E extends keyof JSX.IntrinsicElements = 'div'
> = P &
  Omit<StructuralReactBucketProps, keyof P> &
  Omit<JSX.IntrinsicElements[E], keyof P> &
  AnyObject;
/**
 * Generate a Type Dedicated to Flexbox Container
 */
export declare type FlexboxContainer<
  P,
  E extends keyof JSX.IntrinsicElements = 'div'
> = ReactBucketComponentProps<P, E> & SharedFlexboxContainerProps;
/**
 * Generate a Type dedicated to Flexbox Content Element
 */
export declare type FlexboxContent<
  P,
  E extends keyof JSX.IntrinsicElements = 'div'
> = ReactBucketComponentProps<P, E> & SharedFlexboxContentProps;
/**
 * An interface with Structural ReactBucket Props
 */
export interface StructuralReactBucketProps {
  /** An Element used to Render the Component */
  as?: string | ComponentClass | FunctionComponent;
  /** Main Component Content */
  children?: ReactNode;
  /** User Defined Class Names */
  className?: string;
  /** Content Shorthand */
  content?: ShorthandContent;
}
/**
 * Shared Component props to define style
 */
export interface SharedReactBucketProps {
  /** Choose Main background Color */
  backgroundColor?: ReactBucketColor;
  /** Set element display */
  display?: ResponsiveProps<ElementDisplay>;
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
 * Define an interface with the state
 * element color
 */
export interface SharedComponentStateProps {
  /** Manually set the Element appearance by Color Pool */
  appearance?: ReactBucketColor;
  /** Set the Danger State */
  danger?: boolean;
  /** Set the Info State */
  info?: boolean;
  /** Set the Primary State */
  primary?: boolean;
  /** Set the Secondary State */
  secondary?: boolean;
  /** Set the Success State */
  success?: boolean;
  /** Set the Warning State */
  warning?: boolean;
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
export declare type ChangeHandler<H, P> = (e: ChangeEvent<H>, props: P) => void;
export declare type FocusHandler<H, P> = (e: FocusEvent<H>, props: P) => void;
export declare type ClickHandler<H, P> = (e: MouseEvent<H>, props: P) => void;
export declare type ContentAlign = 'left' | 'center' | 'right';
export declare type FontWeight = 'light' | 'regular' | 'semi bold' | 'bold';
export declare type VerticalAlign = 'on top' | 'on bottom' | 'center';
export declare type ElementDisplay =
  | 'block'
  | 'grid'
  | 'inline block'
  | 'inline flex'
  | 'inline'
  | 'flex'
  | 'table'
  | 'table column group'
  | 'table header group'
  | 'table footer group'
  | 'table row group'
  | 'table cell'
  | 'table column'
  | 'table row'
  | 'none';
export declare type ElementSize =
  | 'extra small'
  | 'small'
  | 'normal'
  | 'large'
  | 'big'
  | 'huge';
export declare type Spacer =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8';
export declare type ShadowElevation =
  | 0
  | 1
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
  | '0'
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
  | '12';
export declare type FlexContentVerticalAlign = VerticalAlign | 'stretched';
export declare type FlexContentHorizontalAlign =
  | 'on start'
  | 'centered'
  | 'on end'
  | 'spaced between'
  | 'spaced around';
export declare type FlexContentOffset =
  | 1
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
export declare type FlexContentWidth = FlexContentOffset | 24 | '24' | 'auto';
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
export declare type ResponsiveProps<T> = T | ResponsiveValue<T>;
export declare type ResponsiveContentWidth = ResponsiveProps<FlexContentWidth>;
export declare type ResponsiveContentOffset = ResponsiveProps<
  FlexContentOffset
>;
export declare type BrandColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info';
export declare type UIColor =
  | 'text'
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
  | 'hidden';
export declare type SocialColor =
  | 'facebook'
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
export declare type ReactBucketColor = BrandColor | UIColor | SocialColor;
