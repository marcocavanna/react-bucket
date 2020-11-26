import * as React from 'react';
import { ReactBucketComponentProps, ShorthandCollection } from '../../generic';
import { MenuItemProps } from './MenuItem.types';
export interface MenuProps extends ReactBucketComponentProps<StrictMenuProps> {}
export interface StrictMenuProps {
  /** Index of the current active menu item */
  activeIndex?: number;
  /** Initial ActiveIndex, used to auto control active index prop */
  defaultActiveIndex?: number;
  /** Items Shorthand */
  items?: ShorthandCollection<MenuItemProps>;
  /** On item Click callback */
  onItemClick?: (
    e: React.MouseEvent<HTMLElement>,
    props: MenuItemProps
  ) => void;
  /** Set the menu as secondary */
  secondary?: boolean;
  /** Use tab style to render the menu */
  tab?: boolean;
  /** Render the menu as text-only */
  text?: boolean;
  /** Render the menu vertically */
  vertical?: boolean;
}
