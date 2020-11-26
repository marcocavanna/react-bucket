import {
  ReactBucketComponentProps,
  ReactBucketIcon,
  ShorthandContent,
  ShorthandItem,
} from '../../generic';
import {
  HeaderContentProps,
  HeaderSubheaderProps,
} from '../../elements/Header';
import { IconProps } from '../../elements/Icon';
export interface ModalHeaderProps
  extends ReactBucketComponentProps<StrictModalHeaderProps> {}
export interface StrictModalHeaderProps {
  /** Content Shorthand to create Header */
  content?: ShorthandItem<HeaderContentProps>;
  /** Display Header Icon */
  icon?: ReactBucketIcon<IconProps>;
  /** Set Meta Content */
  meta?: ShorthandContent;
  /** Create Subheader Shorthand */
  subheader?: ShorthandItem<HeaderSubheaderProps>;
}
