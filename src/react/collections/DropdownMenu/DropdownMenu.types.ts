import * as React from 'react';

import {
  MinimalReactBucketComponentProps,
  ShorthandCollection
} from '../../generic';

import { MenuItemProps } from '../Menu/MenuItem.types';


export interface DropdownMenuProps extends MinimalReactBucketComponentProps<StrictDropdownMenuProps> {
}

export interface StrictDropdownMenuProps {
  /** Menu Items */
  items?: ShorthandCollection<MenuItemProps>;

  /** Handler Menu Close */
  onClose?: (e: React.MouseEvent<HTMLElement>, props: DropdownMenuProps) => void;

  /** On Menu Item Click */
  onItemClick?: (e: React.MouseEvent<HTMLElement>, props: MenuItemProps) => void;

  /** Handler Menu Open */
  onOpen?: (e: React.MouseEvent<HTMLElement>, props: DropdownMenuProps) => void;

  /** Trigger Element */
  trigger?: React.ReactElement;
}
