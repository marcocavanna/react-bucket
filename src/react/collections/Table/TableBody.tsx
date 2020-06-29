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

import { TableBodyProps } from './TableBody.types';


export default function TableBody(props: TableBodyProps): React.ReactElement<TableBodyProps> {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(TableBody, props);

  const classes = clsx(
    className,
    'body'
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

TableBody.displayName = 'TableBody';

TableBody.defaultProps = {
  as: 'tbody'
} as Partial<TableBodyProps>;

TableBody.create = createShorthandFactory(TableBody, (content) => ({ content }));
