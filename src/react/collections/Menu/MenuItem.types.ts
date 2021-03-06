import * as React from 'react';

import {
  ReactBucketIcon,
  ReactBucketComponentProps,
  SharedComponentStateProps,
  ShorthandItem
} from '../../generic';

import { IconProps } from '../../elements/Icon';

import type { MenuProps } from './Menu.types';


export interface MenuItemProps extends ReactBucketComponentProps<StrictMenuItemProps>, SharedComponentStateProps {

}

export interface StrictMenuItemProps {
  /** Set the Active Style */
  active?: boolean;

  /** Set the default state for menu is open value */
  defaultMenuIsOpen?: boolean;

  /** Disable the Menu Item */
  disabled?: boolean;

  /** Disable the Ripple Effect */
  disableRipple?: boolean;

  /** Set as Header Item */
  header?: boolean;

  /** Draw Item Icon */
  icon?: ReactBucketIcon<IconProps>;

  /** Menu item index position */
  index?: number;

  /** Build a submenu */
  menu?: ShorthandItem<MenuProps>;

  /** Manually set open state for menu */
  menuIsOpen?: boolean;

  /** On Click Element Handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: MenuItemProps) => void;
}
