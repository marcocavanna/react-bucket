import * as React from 'react';
import { ReactBucketIcon, ReactBucketComponentProps } from '../../generic';
import { IconProps } from '../../elements/Icon';
export interface MenuItemProps
  extends ReactBucketComponentProps<StrictMenuItemProps> {}
export interface StrictMenuItemProps {
  /** Set the Active Style */
  active?: boolean;
  /** Disable the Menu Item */
  disabled?: boolean;
  /** Draw Item Icon */
  icon?: ReactBucketIcon<IconProps>;
  /** Menu item index position */
  index?: number;
  /** On Click Element Handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: MenuItemProps) => void;
}
