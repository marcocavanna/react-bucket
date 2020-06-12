import * as React from 'react';

import {
  FontAwesomeIcon, FontAwesomeIconStyle,
  ReactBucketComponentProps,
  SharedComponentStateProps
} from '../../generic';


export interface IconProps extends ReactBucketComponentProps<StrictIconProps, 'i'>,
  SharedComponentStateProps {
}

export interface StrictIconProps {
  /** Apply border to icon */
  bordered?: boolean;

  /** Visually disable the icon, this would prevent onClick too */
  disabled?: boolean;

  /** Fit icon width to minimal dimension */
  fitted?: boolean;

  /** Apply a flip to the icon */
  flip?: 'horizontal' | 'vertical' | 'both';

  /** Manually specify the icon style */
  iconStyle?: FontAwesomeIconStyle;

  /** Handle icon Click event */
  onClick?: (event: React.MouseEvent<HTMLElement>, props: IconProps) => void;

  /** The icon to show */
  name?: FontAwesomeIcon;

  /** Apply a rotation to icon */
  rotate?: 90 | 180 | 270 | '90' | '180' | '270';

  /** Apply `spin` animation to icon */
  spin?: boolean;

  /** Remove icon margin */
  unspaced?: boolean;
}
