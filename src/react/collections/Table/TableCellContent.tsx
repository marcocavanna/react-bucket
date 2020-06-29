import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  classByValue,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { TableCellContentProps } from './TableCellContent.types';


export default function TableCellContent(props: TableCellContentProps): React.ReactElement<TableCellContentProps> {
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
    classByValue(type),
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

TableCellContent.displayName = 'CellContent';

TableCellContent.defaultProps = {
  as  : 'p',
  type: 'content'
} as Partial<TableCellContentProps>;

TableCellContent.create = createShorthandFactory(TableCellContent, (content) => ({ content }));
