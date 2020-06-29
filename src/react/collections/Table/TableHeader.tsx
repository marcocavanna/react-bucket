import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { TableHeaderProps } from './TableHeader.types';


export default function TableHeader(props: TableHeaderProps): React.ReactElement<TableHeaderProps> {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(TableHeader, props);

  const classes = clsx(
    className,
    'head'
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {
  as: 'thead'
} as Partial<TableHeaderProps>;

TableHeader.create = createShorthandFactory(TableHeader, (content) => ({ content }));
