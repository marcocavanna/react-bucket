import * as React from 'react';
import clsx from 'clsx';

import {
  getElementType,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { RowProps } from './Row.types';
import { getSharedClassNames } from '../../lib';
import Column from './Column';


function Row(props: RowProps) {

  const {
    className,
    rest: {
      children,
      content,
      columns,
      ...rest
    }
  } = getSharedClassNames(props);

  const ElementType = getElementType(Row, props);

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

}

Row.displayName = 'Row';

export default Row;
