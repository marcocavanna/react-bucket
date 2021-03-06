import * as React from 'react';

import {
  ReactBucketComponentProps,
  ReactBucketIcon,
  SharedComponentStateProps,
  ShorthandContent,
  ShorthandItem
} from '../../generic';

import { BadgeProps } from '../Badge';

import { IconProps } from '../Icon';


export interface AvatarProps extends ReactBucketComponentProps<StrictAvatarProps>, SharedComponentStateProps {
}

export interface StrictAvatarProps {
  /** Draw the Notification Badge */
  badge?: ShorthandItem<BadgeProps>;

  /** Set disabled state */
  disabled?: boolean;

  /** Remove Background Color */
  flat?: boolean;

  /** Set avatar icon */
  icon?: ReactBucketIcon<IconProps>;

  /** On Click Event Handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: AvatarProps) => void;

  /** Set avatar tooltip */
  tooltip?: ShorthandContent;

  /** Avatar type */
  type?: 'round' | 'square' | 'flex';
}
