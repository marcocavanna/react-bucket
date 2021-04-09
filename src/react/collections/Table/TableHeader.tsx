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

import { TableHeaderProps } from './TableHeader.types';


/* --------
 * Component Declare
 * -------- */
type TableHeaderComponent = CreatableFunctionComponent<TableHeaderProps>;


/* --------
 * Component Render
 * -------- */
const TableHeader: TableHeaderComponent = (receivedProps) => {

  const props = useWithDefaultProps('tableHeader', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(TableHeader, receivedProps, props);

  const classes = clsx(
    className,
    'head'
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

TableHeader.displayName = 'TableHeader';

TableHeader.create = createShorthandFactory(TableHeader, (content) => ({ content }));

export default TableHeader;
