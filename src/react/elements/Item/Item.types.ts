import * as React from 'react';

import {
  ReactBucketComponentProps,
  SharedComponentStateProps,
  ShorthandCollection,
  ShorthandItem
} from '../../generic';

import { AvatarProps } from '../Avatar';
import { ButtonProps } from '../Button';

import { StrictItemContentProps } from './ItemContent.types';


export interface ItemProps extends ReactBucketComponentProps<StrictItemProps>, SharedComponentStateProps {
}

export interface StrictItemProps extends StrictItemContentProps {
  /** Show item as Active */
  active?: boolean;

  /** Avatar Shorthand Props */
  avatar?: ShorthandItem<AvatarProps>;

  /** Show item as Disabled */
  disabled?: boolean;

  /** On Click event Handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: ItemProps) => void;

  /** Shorthand tools */
  tools?: ShorthandCollection<ButtonProps>;
}
