import * as React from 'react';

import { select } from '@storybook/addon-knobs';
import { Column, Row } from './collections/Grid';

import { Header, HeaderProps } from './elements/Header';

import {
  ReactBucketColor,
  FontWeight,
  ElementSize,
  ContentAlign,
  ShorthandItem
} from './generic';


/* --------
 * Build a Descriptor
 * -------- */
interface StoryDescriptorProps {
  className?: string;

  description?: React.ReactNode;

  content?: React.ReactNode;

  header?: ShorthandItem<HeaderProps>;

  postDescription?: React.ReactNode;
}

export const StoryDescriptor: React.FunctionComponent<StoryDescriptorProps> = (props) => {
  return (
    <Row className={props.className}>
      <Column>
        {Header.create(props.header, { autoGenerateKey: false })}
        {props.description && (
          <div className={'mt-4 mb-4'}>
            {props.description}
          </div>
        )}
        {props.content ?? props.children}
        {props.postDescription && (
          <div className={'mt-4'}>
            {props.postDescription}
          </div>
        )}
      </Column>
    </Row>
  );
};


/* --------
 * Build a Box Component that could be used in Stories
 * -------- */
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

export const Box: React.FC<BoxProps> = (props) => (
  <div
    className={`has-background-primary ${props.className}`}
    style={{
      minHeight     : props.height ?? 100,
      borderRadius  : 15,
      display       : 'flex',
      justifyContent: 'center',
      alignItems    : 'center',
      margin        : '2em 0'
    }}
  >
    <div className={'is-large has-font-bold'}>
      {props.content ?? 'BOX'}
    </div>
  </div>
);


/* --------
 * Build a Set of Default Knobs
 * -------- */
const colors = {
  brand : [ 'primary', 'secondary', 'danger', 'warning', 'success', 'info' ],
  ui    : [
    'text',
    'text tint',
    'text shade',
    'black',
    'black tint',
    'white',
    'white shade',
    'blue',
    'teal',
    'green',
    'yellow',
    'orange',
    'red',
    'pink',
    'purple',
    'grey lightest',
    'grey light',
    'grey',
    'grey dark',
    'grey darkest',
    'transparent'
  ],
  social: [
    'facebook',
    'twitter',
    'youtube',
    'instagram',
    'pinterest',
    'linkedin',
    'google',
    'google-plus',
    'whatsapp',
    'tumblr',
    'apple',
    'amazon',
    'microsoft',
    'vimeo',
    'skype',
    'android',
    'dribble',
    'slack',
    'yahoo',
    'telegram'
  ]
};

const toObject = (data: string[]): { [key: string]: string } => data.reduce((result, value) => {
  result[value] = value;
  return result;
}, {} as { [key: string]: string });

/** Build an Object with all ReactBucket Colors */
const allColors = {
  default: null,
  ...toObject(colors.brand),
  ...toObject(colors.ui),
  ...toObject(colors.social)
};

export function getBackgroundColor(defaultValue?: ReactBucketColor) {
  return select(
    'Background Color',
    allColors,
    defaultValue ?? 'default'
  ) as ReactBucketColor;
}

export function getFontWeight(defaultValue?: FontWeight) {
  return select(
    'Font Weight',
    {
      default: null,
      ...toObject([ 'light', 'regular', 'semi bold', 'bold' ])
    },
    defaultValue ?? 'default'
  ) as unknown as FontWeight;
}

export function getTextColor(defaultValue?: ReactBucketColor) {
  return select(
    'Text Color',
    allColors,
    defaultValue ?? 'default'
  ) as ReactBucketColor;
}

export function getElementSize(defaultValue?: ElementSize) {
  return select(
    'Size',
    {
      default: null,
      ...toObject([ 'extra small', 'small', 'normal', 'large', 'big', 'huge' ])
    },
    defaultValue ?? 'default'
  ) as unknown as ElementSize;
}

export function getTextAlign(defaultValue?: ContentAlign) {
  return select(
    'Text Align',
    {
      default: null,
      ...toObject([ 'left', 'center', 'right', 'justify' ])
    },
    defaultValue ?? 'default'
  ) as unknown as ContentAlign;
}

export const LoremIpsum = () => (
  <p>
    {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac est cursus, scelerisque magna eu
      , blandit elit. Duis vitae nibh eu neque malesuada semper id sit amet massa. Duis iaculis nisl vitae tristique
      varius. Duis in faucibus nulla.
      Etiam porttitor ipsum dapibus, posuere mauris at, scelerisque tellus.
      Praesent euismod tellus eu dui fermentum pretium.
      Ut quis fermentum justo, a interdum purus. Duis arcu elit, porta quis eros quis, ullamcorper pretium nibh
      . Praesent non tincidunt neque. Integer eget luctus nibh. Curabitur sodales, felis eu rutrum scelerisque
      , justo urna placerat dolor, et rhoncus mauris nisl et orci. Nunc ornare nibh sed sapien consectetur
      , ut aliquam arcu placerat. Pellentesque pulvinar tortor et placerat porttitor. Integer feugiat orci lorem
      , vel iaculis mi bibendum id. Nulla a leo interdum, malesuada mauris at, ultricies dolor
      . Suspendisse sed tortor eleifend tellus convallis tincidunt.`}
  </p>
);
