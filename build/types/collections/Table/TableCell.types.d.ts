import {
  ReactBucketComponentProps,
  ShorthandItem,
  SharedComponentStateProps,
  SharedFlexboxContentProps,
} from '../../generic';
import { TableCellContentProps } from './TableCellContent.types';
export interface TableCellProps
  extends ReactBucketComponentProps<StrictTableCellProps, 'td'> {}
export interface StrictTableCellProps
  extends SharedComponentStateProps,
    Pick<SharedFlexboxContentProps, 'width'> {
  /** Render the Cell as Active */
  active?: boolean;
  /** Cell Content Shorthand */
  content?: ShorthandItem<TableCellContentProps>;
  /** Cell Title Shorthand */
  header?: ShorthandItem<TableCellContentProps>;
  /** Cell Meta Shorthand */
  meta?: ShorthandItem<TableCellContentProps>;
  /** Set the Cell as Selectable */
  selectable?: boolean;
  /** Show all cell content removing ellipsis overflow */
  wrapped?: boolean;
}
