import * as React from 'react';

import { FontAwesomeIcon, ReactBucketComponentProps, ShorthandItem } from '../../generic';

import { IconProps } from '../Icon';


export type SectionDirection = 'vertical' | 'horizontal';

export interface SectionProps extends ReactBucketComponentProps<StrictSectionProps> {
}

export interface StrictSectionProps {
  /** Set the Section Direction */
  direction?: SectionDirection;

  /** Add a Divider under the Section */
  divided?: boolean;

  /** Add an Icon to the Label */
  icon?: FontAwesomeIcon | ShorthandItem<IconProps>;

  /** Set the Section Label */
  label?: React.ReactNode;

  /** Reverse the Order of Label and Content */
  reverse?: boolean;
}