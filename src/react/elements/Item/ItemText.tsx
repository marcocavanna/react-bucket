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

import { ItemTextProps } from './ItemText.types';


export default function ItemText(props: ItemTextProps): React.ReactElement<ItemTextProps> {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemText, props);

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
}

ItemText.displayName = 'ItemText';

ItemText.create = createShorthandFactory(ItemText, (content) => ({ content }));
