import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { RowProps } from './Row.types';

import Column from './Column';

/* --------
 * Component Declare
 * -------- */
type RowComponent = React.FunctionComponent<RowProps>;


/* --------
 * Component Render
 * -------- */
const Row: RowComponent = (receivedProps) => {

  const props = useWithDefaultProps('row', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      columns,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(Row, props);

  const classes = clsx(
    'with-columns',
    className
  );

  if (Array.isArray(columns)) {
    return (
      <ElementType {...rest} className={classes}>
        {columns.map(column => (
          Column.create(column, { autoGenerateKey: true })
        ))}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

Row.displayName = 'Row';

export default Row;
