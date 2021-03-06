import {
  ReactBucketComponentProps,
  ShorthandItem
} from '../../generic';

import { LoaderProps } from '../Loader';
import { ItemHeaderProps } from './ItemHeader.types';
import { ItemMetaProps } from './ItemMeta.types';


export interface ItemContentProps extends ReactBucketComponentProps<StrictItemContentProps> {
}

export interface StrictItemContentProps {
  /** Item Content shorthand */
  content?: ShorthandItem<ItemContentProps>;

  /** Item Header shorthand */
  header?: ShorthandItem<ItemHeaderProps>;

  /** Show the Loader instead of main content */
  loading?: boolean | LoaderProps;

  /** Item Meta shorthand */
  meta?: ShorthandItem<ItemMetaProps>;
}
