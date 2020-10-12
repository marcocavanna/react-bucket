import {
  ReactBucketComponentProps,
  ShorthandItem
} from '../../generic';

import { ItemHeaderProps } from './ItemHeader.types';
import { ItemMetaProps } from './ItemMeta.types';


export interface ItemContentProps extends ReactBucketComponentProps<StrictItemContentProps> {
}

export interface StrictItemContentProps {
  /** Item Content shorthand */
  content?: ShorthandItem<ItemContentProps>;

  /** Item Header shorthand */
  header?: ShorthandItem<ItemHeaderProps>;

  /** Item Meta shorthand */
  meta?: ShorthandItem<ItemMetaProps>;
}
