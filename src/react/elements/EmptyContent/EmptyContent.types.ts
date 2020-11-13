import {
  ReactBucketComponentProps,
  ReactBucketIcon,
  ShorthandContent,
  ShorthandItem
} from '../../generic';

import { ButtonProps } from '../Button';
import { IconProps } from '../Icon';


export interface EmptyContentProps extends ReactBucketComponentProps<StrictEmptyContentProps> {

}

export interface StrictEmptyContentProps {
  /** Add an Action Button to Empty Content */
  button?: ShorthandItem<ButtonProps>;

  /** Set the Empty Content Header */
  header?: ShorthandContent;

  /** Set the Empty Content Icon */
  icon?: ReactBucketIcon<IconProps>;
}
