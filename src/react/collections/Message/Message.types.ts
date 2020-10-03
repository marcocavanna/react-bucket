import * as React from 'react';

import {
  ReactBucketComponentProps,
  ReactBucketIcon,
  SharedComponentStateProps,
  ShorthandItem
} from '../../generic';

import { HeaderContentProps, HeaderSubheaderProps } from '../../elements/Header';
import { IconProps } from '../../elements/Icon';


export interface MessageProps extends StrictMessageProps, SharedComponentStateProps {
}

export interface StrictMessageProps extends Omit<ReactBucketComponentProps<{}>, 'content'> {
  /** Message Content */
  content?: ShorthandItem<HeaderSubheaderProps>;

  /** Message Header */
  header?: ShorthandItem<HeaderContentProps>;

  /** Message Icon */
  icon?: ReactBucketIcon<IconProps>;

  /** Message could be dismissed, this callback will be fired on dismiss icon click */
  onDismiss?: (e: React.MouseEvent<HTMLElement>, props: MessageProps) => void;
}
