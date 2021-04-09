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

import { TableBodyProps } from './TableBody.types';


/* --------
 * Component Declare
 * -------- */
type TableBodyComponent = CreatableFunctionComponent<TableBodyProps>;


/* --------
 * Component Render
 * -------- */
const TableBody: TableBodyComponent = (receivedProps) => {

  const props = useWithDefaultProps('tableBody', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(TableBody, receivedProps, props);

  const classes = clsx(
    className,
    'body'
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

TableBody.displayName = 'TableBody';

TableBody.create = createShorthandFactory(
  TableBody,
  (content) => ({ content })
);

export default TableBody;
