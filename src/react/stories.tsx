import * as React from 'react';

import { select } from '@storybook/addon-knobs';

import { ReactBucketColor, FontWeight, ElementSize, ContentAlign } from './generic';


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

export function getBackgroundColor() {
  return select(
    'Background Color',
    allColors,
    'default'
  ) as ReactBucketColor;
}

export function getFontWeight() {
  return select(
    'Font Weight',
    {
      default: null,
      ...toObject([ 'light', 'regular', 'semi bold', 'bold' ])
    },
    null
  ) as unknown as FontWeight;
}

export function getTextColor() {
  return select(
    'Text Color',
    allColors,
    'default'
  ) as ReactBucketColor;
}

export function getElementSize() {
  return select(
    'Size',
    {
      default: null,
      ...toObject([ 'extra small', 'small', 'normal', 'large', 'big', 'huge' ])
    },
    'default'
  ) as unknown as ElementSize;
}

export function getTextAlign() {
  return select(
    'Text Align',
    {
      default: null,
      ...toObject([ 'left', 'center', 'right', 'justify' ])
    },
    'default'
  ) as unknown as ContentAlign;
}
