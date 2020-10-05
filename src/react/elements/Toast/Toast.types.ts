import * as React from 'react';

import {
  ReactBucketComponentProps,
  ReactBucketIcon,
  SharedComponentStateProps,
  ShorthandItem
} from '../../generic';

import { HeaderContentProps, HeaderSubheaderProps } from '../Header';
import { IconProps } from '../Icon';


export interface ToastProps extends ReactBucketComponentProps<StrictToastProps>, SharedComponentStateProps {
}

export interface StrictToastProps {
  /** Children component */
  children?: React.ReactNode | React.ComponentType<{ dismiss?: (e: React.MouseEvent<HTMLElement>) => void }>;

  /** Toast Content */
  content?: ShorthandItem<HeaderSubheaderProps>;

  /** Dismiss Function, used to remove Toast */
  dismiss?: () => void;

  /** Toast is Dismissible */
  dismissible?: boolean | ReactBucketIcon<IconProps>;

  /** Toast Header Content */
  header?: ShorthandItem<HeaderContentProps>;

  /** Toast icon */
  icon?: ReactBucketIcon<IconProps>;

  /** On Click Callback */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: ToastProps) => void;
}
