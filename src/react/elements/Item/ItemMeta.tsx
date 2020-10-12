import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { ItemMetaProps } from './ItemMeta.types';


export default function ItemMeta(props: ItemMetaProps): React.ReactElement<ItemMetaProps> {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemMeta, props);

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
}

ItemMeta.displayName = 'ItemMeta';

ItemMeta.create = createShorthandFactory(ItemMeta, (content) => ({ content }));
