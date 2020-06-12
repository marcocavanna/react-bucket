import * as React from 'react';

import {
  ReactBucketComponentProps,
  SharedComponentStateProps
} from '../../generic';


export interface ButtonProps extends ReactBucketComponentProps<StrictButtonProps, 'button'>, SharedComponentStateProps {
}

export interface StrictButtonProps {
  /** Disable the Button */
  disabled?: boolean;

  /** Set the Flat Style, inverting Appearance Color */
  flat?: boolean;

  /** Defined onClick function */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, props: ButtonProps) => void;

  /** Define the Button Tab Index */
  tabIndex?: number;
}
