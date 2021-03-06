import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import {
  useSharedClassName,
  useElementType
} from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { ColumnProps } from './Column.types';


/* --------
 * Component Declare
 * -------- */
type ColumnComponent = CreatableFunctionComponent<ColumnProps>;


/* --------
 * Component Render
 * -------- */
const Column: ColumnComponent = (receivedProps) => {

  const props = useWithDefaultProps('column', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(Column, receivedProps, props);

  const classes = clsx(
    'column',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

Column.displayName = 'Column';

Column.create = createShorthandFactory(Column, content => ({ content }));

export default Column;
