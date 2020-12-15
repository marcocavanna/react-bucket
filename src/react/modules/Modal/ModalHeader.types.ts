import {
  ReactBucketComponentProps,
  ShorthandContent
} from '../../generic';

import {
  StrictHeaderProps
} from '../../elements/Header';


export interface ModalHeaderProps extends ReactBucketComponentProps<StrictModalHeaderProps> {
}

export interface StrictModalHeaderProps extends StrictHeaderProps {
  /** Set Meta Content */
  meta?: ShorthandContent;
}
