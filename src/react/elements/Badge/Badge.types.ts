import {
  ReactBucketComponentProps,
  ReactBucketIcon,
  SharedComponentStateProps
} from '../../generic';
import { IconProps } from '../Icon';


export interface BadgeProps extends ReactBucketComponentProps<StrictBadgeProps>, SharedComponentStateProps {
}

export interface StrictBadgeProps {
  /** Icon shorthand */
  icon?: ReactBucketIcon<IconProps>;
}
