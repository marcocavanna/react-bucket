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

import { ItemTextProps } from './ItemText.types';


/* --------
 * Component Declare
 * -------- */
type ItemTextComponent = CreatableFunctionComponent<ItemTextProps>;

/* --------
 * Component Render
 * -------- */
const ItemText: ItemTextComponent = (receivedProps) => {

  const props = useWithDefaultProps('itemText', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemText, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    'item-text',
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

ItemText.displayName = 'ItemText';

ItemText.create = createShorthandFactory(ItemText, (content) => ({ content }));

export default ItemText;
