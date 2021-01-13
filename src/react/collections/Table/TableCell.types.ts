import { IconProps } from '../../elements/Icon';

import {
  ReactBucketComponentProps,
  ShorthandItem,
  SharedComponentStateProps,
  SharedFlexboxContentProps, ReactBucketIcon
} from '../../generic';

import { TableCellContentProps } from './TableCellContent.types';


export interface TableCellProps extends ReactBucketComponentProps<StrictTableCellProps, 'td'> {
}

export interface StrictTableCellProps extends SharedComponentStateProps,
  Pick<SharedFlexboxContentProps, 'width'> {
  /** Render the Cell as Active */
  active?: boolean;

  /** Cell Content Shorthand */
  content?: ShorthandItem<TableCellContentProps>;

  /** Cell Title Shorthand */
  header?: ShorthandItem<TableCellContentProps>;

  /** Add a Cell Icon */
  icon?: ReactBucketIcon<IconProps>;

  /** Cell Meta Shorthand */
  meta?: ShorthandItem<TableCellContentProps>;

  /** Set the Cell as Selectable */
  selectable?: boolean;

  /** Show all cell content removing ellipsis overflow */
  wrapped?: boolean;
}
