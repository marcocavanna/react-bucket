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

import { ItemContentProps } from './ItemContent.types';

import ItemHeader from './ItemHeader';
import ItemMeta from './ItemMeta';
import ItemText from './ItemText';


/* --------
 * Component Declare
 * -------- */
type ItemContentComponent = CreatableFunctionComponent<ItemContentProps> & {
  Header: typeof ItemHeader;
  Meta: typeof ItemMeta;
  Text: typeof ItemText;
};

/* --------
 * Component Render
 * -------- */
const ItemContent: ItemContentComponent = (props) => {

  const {
    className,
    rest: {
      children,
      content,
      header,
      meta,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemContent, props);

  /** Build the element class list */
  const classes = clsx(
    'content',
    className
  );

  const hasChildren = !childrenUtils.isNil(children);


  // ----
  // Define Component Memoized Element
  // ----
  const headerElement = React.useMemo(
    () => !hasChildren && ItemHeader.create(header, {
      autoGenerateKey: false
    }),
    [ hasChildren, header ]
  );

  const textElement = React.useMemo(
    () => !hasChildren && ItemText.create(content, {
      autoGenerateKey: false
    }),
    [ hasChildren, content ]
  );

  const metaElement = React.useMemo(
    () => !hasChildren && ItemMeta.create(meta, {
      autoGenerateKey: false
    }),
    [ hasChildren, meta ]
  );

  // ----
  // Component render with declared children
  // ----
  if (hasChildren) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }


  // ----
  // Component render with shorthand
  // ----
  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
      {textElement}
      {metaElement}
    </ElementType>
  );
};

ItemContent.displayName = 'ItemContent';

ItemContent.Header = ItemHeader;
ItemContent.Text = ItemText;
ItemContent.Meta = ItemMeta;

ItemContent.create = createShorthandFactory(ItemContent, (content) => ({ content }));

export default ItemContent;
