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

import { TableCellContentProps } from './TableCellContent.types';


/* --------
 * Component Declare
 * -------- */
type TableCellContentComponent = CreatableFunctionComponent<TableCellContentProps>;


/* --------
 * Component Render
 * -------- */
const TableCellContent: TableCellContentComponent = (props) => {
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

  const ElementType = useElementType(TableCellContent, props);

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

TableCellContent.defaultProps = {
  as  : 'p',
  type: 'content'
};

TableCellContent.create = createShorthandFactory(TableCellContent, (content) => ({ content }));

export default TableCellContent;
