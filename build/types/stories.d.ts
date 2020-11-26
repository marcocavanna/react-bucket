import * as React from 'react';
import { HeaderProps } from './elements/Header';
import {
  ReactBucketColor,
  FontWeight,
  ElementSize,
  ContentAlign,
  ShorthandItem,
} from './generic';
interface StoryDescriptorProps {
  className?: string;
  description?: React.ReactNode;
  content?: React.ReactNode;
  header?: ShorthandItem<HeaderProps>;
  postDescription?: React.ReactNode;
}
export declare const StoryDescriptor: React.FunctionComponent<StoryDescriptorProps>;
export interface BoxProps {
  /** User defined className */
  className?: string;
  /** Content Shorthand */
  content?: React.ReactNode;
  /** Set Box Height */
  height?: number;
  /** Set custom style */
  style?: React.CSSProperties;
}
export declare const Box: React.FC<BoxProps>;
export declare function getBackgroundColor(
  defaultValue?: ReactBucketColor
): ReactBucketColor;
export declare function getFontWeight(defaultValue?: FontWeight): FontWeight;
export declare function getTextColor(
  defaultValue?: ReactBucketColor
): ReactBucketColor;
export declare function getElementSize(defaultValue?: ElementSize): ElementSize;
export declare function getTextAlign(defaultValue?: ContentAlign): ContentAlign;
export declare const LoremIpsum: () => JSX.Element;
export {};
