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

import { useWithDefaultProps } from '../../context/BucketContext';

import { ItemMetaProps } from './ItemMeta.types';


/* --------
 * Component Declare
 * -------- */
type ItemMetaComponent = CreatableFunctionComponent<ItemMetaProps>;


/* --------
 * Component Render
 * -------- */
const ItemMeta: ItemMetaComponent = (receivedProps) => {

  const props = useWithDefaultProps('itemMeta', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemMeta, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    'item-meta',
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

ItemMeta.displayName = 'ItemMeta';

ItemMeta.create = createShorthandFactory(ItemMeta, (content) => ({ content }));

export default ItemMeta;
