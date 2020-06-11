import { ReactBucketComponentProps, ShorthandItem } from '../../generic';

import { HeaderSubheaderProps } from './HeaderSubheader.types';
import { HeaderContentProps } from './HeaderContent.types';


export interface HeaderProps extends ReactBucketComponentProps<StrictHeaderProps> {

}

export interface StrictHeaderProps {
  /** Avoid Children on Header Component */
  children?: never;

  /** Content Shorthand to create Header */
  content?: ShorthandItem<HeaderContentProps>;

  /** Set disabled Style */
  disabled?: boolean;

  /** Set if the header will divide content */
  divided?: boolean;

  /** Create Subheader Shorthand */
  subheader?: ShorthandItem<HeaderSubheaderProps>;
}
