import * as React from 'react';

import { FontAwesomeIcon, ReactBucketComponentProps, ShorthandItem } from '../../generic';

import { ButtonProps } from '../Button';
import { IconProps } from '../Icon';


export interface EmptyContentProps extends ReactBucketComponentProps<StrictEmptyContentProps> {

}

export interface StrictEmptyContentProps {
  /** Add an Action Button to Empty Content */
  button?: ShorthandItem<ButtonProps>;

  /** Set the Empty Content Header */
  header?: React.ReactNode;

  /** Set the Empty Content Icon */
  icon?: FontAwesomeIcon | ShorthandItem<IconProps>;
}
