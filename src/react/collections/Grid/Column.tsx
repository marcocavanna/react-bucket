import * as React from 'react';
import clsx from 'clsx';

import {
  getElementType,
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { ColumnProps } from './Column.types';
import { getSharedClassNames } from '../../lib';


function Column(props: ColumnProps): React.ReactElement<ColumnProps> {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = getSharedClassNames(props);

  const ElementType = getElementType(Column, props);

  const classes = clsx(
    'column',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

Column.displayName = 'Column';

Column.create = createShorthandFactory<ColumnProps>(Column, content => ({ content }));

export default Column;
