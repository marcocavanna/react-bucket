import * as React from 'react';
import clsx from 'clsx';

import { classByValue, createShorthandFactory } from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import {
  useSharedClassName
} from '../../lib';

import { TableHeaderCellProps } from './TableHeaderCell.types';
import TableCell from './TableCell';


/* --------
 * Component Declare
 * -------- */
type TableHeaderCellComponent = CreatableFunctionComponent<TableHeaderCellProps>;


/* --------
 * Component Render
 * -------- */
const TableHeaderCell: TableHeaderCellComponent = (props) => {

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

};

TableHeaderCell.displayName = 'TableHeaderCell';

TableHeaderCell.defaultProps = {
  as: 'th'
};

TableHeaderCell.create = createShorthandFactory(TableHeaderCell, (content) => ({ content }));

export default TableHeaderCell;
