import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { TableCellContentProps } from './TableCellContent.types';


/* --------
 * Component Declare
 * -------- */
type TableCellContentComponent = CreatableFunctionComponent<TableCellContentProps>;


/* --------
 * Component Render
 * -------- */
const TableCellContent: TableCellContentComponent = (receivedProps) => {

  const props = useWithDefaultProps('tableCellContent', receivedProps);
  const {
    className,
    rest: {
      children,
      content,
      type,
      truncate,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(TableCellContent, receivedProps, props);

  const classes = clsx(
    truncate && 'truncated',
    !!type && `cell-text-${type}`,
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

TableCellContent.displayName = 'CellContent';

TableCellContent.create = createShorthandFactory(TableCellContent, (content) => ({ content }));

export default TableCellContent;
