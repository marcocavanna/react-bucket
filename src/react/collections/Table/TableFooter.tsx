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

import { TableFooterProps } from './TableFooter.types';


export default function TableFooter(props: TableFooterProps): React.ReactElement<TableFooterProps> {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(TableFooter, props);

  const classes = clsx(
    className,
    'foot'
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

TableFooter.displayName = 'TableFooter';

TableFooter.defaultProps = {
  as: 'tfoot'
} as Partial<TableFooterProps>;

TableFooter.create = createShorthandFactory(TableFooter, (content) => ({ content }));
