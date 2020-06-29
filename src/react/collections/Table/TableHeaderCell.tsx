import * as React from 'react';
import clsx from 'clsx';

import {
  useSharedClassName
} from '../../lib';

import { TableHeaderCellProps } from './TableHeaderCell.types';
import TableCell from './TableCell';
import { classByValue, createShorthandFactory } from '@appbuckets/react-ui-core';


export default function TableHeaderCell(props: TableHeaderCellProps): React.ReactElement {

  const {
    className,
    rest: {
      sortable,
      sorted,
      ...rest
    }
  } = useSharedClassName(props);

  const classes = clsx(
    className,
    sorted && 'sorted',
    classByValue(sorted),
    sortable && 'sortable'
  );

  return (
    <TableCell
      {...rest}
      as={props.as}
      className={classes}
    />
  );

}

TableHeaderCell.displayName = 'TableHeaderCell';

TableHeaderCell.defaultProps = {
  as: 'th'
} as Partial<TableHeaderCellProps>;

TableHeaderCell.create = createShorthandFactory(TableHeaderCell, (content) => ({ content }));
