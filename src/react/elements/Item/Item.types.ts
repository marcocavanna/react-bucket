import * as React from 'react';

import {
  ReactBucketComponentProps,
  SharedComponentStateProps,
  ShorthandItem
} from '../../generic';

import { AvatarProps } from '../Avatar';


export interface ItemProps extends ReactBucketComponentProps<StrictItemProps>, SharedComponentStateProps {
}

export interface StrictItemProps {
  /** Show item as Active */
  active?: boolean;

  /** Avatar Shorthand Props */
  avatar?: ShorthandItem<AvatarProps>;

  /** Show item as Disabled */
  disabled?: boolean;

  /** On Click event Handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: ItemProps) => void;
}
