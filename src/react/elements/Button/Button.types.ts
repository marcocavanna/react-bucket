import * as React from 'react';

import {
  FontAwesomeIcon,
  ReactBucketComponentProps,
  SharedComponentStateProps,
  ShorthandItem
} from '../../generic';

import { IconProps } from '../Icon';


export interface ButtonProps extends ReactBucketComponentProps<StrictButtonProps, 'button'>, SharedComponentStateProps {
}

export interface StrictButtonProps {
  /** Set button as Active, this option will work only with `toggle` button */
  active?: boolean;

  /** Disable the Button */
  disabled?: boolean;

  /** Draw button as a FAB, it work only without content */
  fab?: boolean;

  /** Set the Flat Style, inverting Appearance Color */
  flat?: boolean;

  /** Se the Button as Full Width */
  full?: boolean;

  /** Insert an Icon into the Button */
  icon?: FontAwesomeIcon | ShorthandItem<IconProps>;

  /** Set the Icon position, this prop is ignored without icon */
  iconPosition?: 'left' | 'right';

  /** Invert Button Style */
  inverted?: boolean;

  /** Set Loading State */
  loading?: boolean;

  /** Defined onClick function */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, props: ButtonProps) => void;

  /** Make the Button rounded */
  rounded?: boolean;

  /** Define the Button Tab Index */
  tabIndex?: number;

  /** Set the button as a Toggle */
  toggle?: boolean;
}
