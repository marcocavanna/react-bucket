import {
  ReactBucketComponentProps,
  ReactBucketIcon,
  ShorthandCollection,
  ShorthandItem
} from '../../generic';
import { ButtonProps } from '../Button';

import { HeaderSubheaderProps } from './HeaderSubheader.types';
import { HeaderContentProps } from './HeaderContent.types';

import { IconProps } from '../Icon';


export interface HeaderProps extends ReactBucketComponentProps<StrictHeaderProps> {

}

export interface StrictHeaderProps {
  /** Header Actions Collection, like CTA */
  actions?: ShorthandCollection<ButtonProps>;

  /** Content Shorthand to create Header */
  content?: ShorthandItem<HeaderContentProps>;

  /** Set disabled Style */
  disabled?: boolean;

  /** Set if the header will divide content */
  divided?: boolean;

  /** Display Header Icon */
  icon?: ReactBucketIcon<IconProps>;

  /** Create Subheader Shorthand */
  subheader?: ShorthandItem<HeaderSubheaderProps>;
}
