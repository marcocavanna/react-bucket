import { ReactBucketComponentProps, ShorthandCollection } from '../../generic';
import { ItemProps } from './Item.types';
export interface ItemGroupProps
  extends ReactBucketComponentProps<StrictItemGroupProps> {}
export interface StrictItemGroupProps {
  /** Divide child items */
  divided?: boolean;
  /** Items Shorthand */
  items?: ShorthandCollection<ItemProps>;
  /** Relax items, increasing spacing */
  relaxed?: boolean;
}
