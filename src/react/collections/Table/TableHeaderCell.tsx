import * as React from 'react';
import clsx from 'clsx';

import { classByValue, createShorthandFactory } from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import {
  useSharedClassName
} from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { TableHeaderCellProps } from './TableHeaderCell.types';
import TableCell from './TableCell';


/* --------
 * Component Declare
 * -------- */
type TableHeaderCellComponent = CreatableFunctionComponent<TableHeaderCellProps>;


/* --------
 * Component Render
 * -------- */
const TableHeaderCell: TableHeaderCellComponent = (receivedProps) => {

  const props = useWithDefaultProps('tableHeaderCell', receivedProps);

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
      icon={sortable
        ? {
          name     : sorted === 'desc'
            ? 'sort-up'
            : sorted === 'asc'
              ? 'sort-down'
              : 'sort',
          className: 'clickable'
        }
        : undefined}
    />
  );

};

TableHeaderCell.displayName = 'TableHeaderCell';

TableHeaderCell.create = createShorthandFactory(TableHeaderCell, (content) => ({ header: content }));

export default TableHeaderCell;
