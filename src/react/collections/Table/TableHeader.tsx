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

import { TableHeaderProps } from './TableHeader.types';


/* --------
 * Component Declare
 * -------- */
type TableHeaderComponent = CreatableFunctionComponent<TableHeaderProps>;


/* --------
 * Component Render
 * -------- */
const TableHeader: TableHeaderComponent = (props) => {

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

};

TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {
  as: 'thead'
};

TableHeader.create = createShorthandFactory(TableHeader, (content) => ({ content }));

export default TableHeader;
