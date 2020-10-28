import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { ItemHeaderProps } from './ItemHeader.types';


/* --------
 * Component Declare
 * -------- */
type ItemHeaderComponent = CreatableFunctionComponent<ItemHeaderProps>;

/* --------
 * Component Render
 * -------- */
const ItemHeader: ItemHeaderComponent = (props) => {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemHeader, props);

  /** Build the element class list */
  const classes = clsx(
    'item-header',
    className
  );

  /** If children are declared, render them */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {content}
    </ElementType>
  );
};

ItemHeader.displayName = 'ItemHeader';

ItemHeader.create = createShorthandFactory(ItemHeader, (content) => ({ content }));

export default ItemHeader;
