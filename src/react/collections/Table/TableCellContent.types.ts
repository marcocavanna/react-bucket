import { ReactBucketComponentProps } from '../../generic';


export interface TableCellContentProps extends ReactBucketComponentProps<StrictTableCellContentProps, 'p'> {
}

export interface StrictTableCellContentProps {
  type?: 'content' | 'meta' | 'title';

  /** Truncate the cell Content with Ellipsis */
  truncate?: boolean;
}
