import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { Avatar } from '../Avatar';

import { ItemProps } from './Item.types';

import ItemContent from './ItemContent';
import ItemGroup from './ItemGroup';
import ItemTools from './ItemTools';


/* --------
 * Component Declare
 * -------- */
type ItemComponent = CreatableFunctionComponent<ItemProps> & {
  Avatar: typeof Avatar;
  Content: typeof ItemContent;
  Group: typeof ItemGroup;
  Tools: typeof ItemTools;
};

/* --------
 * Component Render
 * -------- */
const Item: ItemComponent = (props) => {

  const {
    className,
    rest: {
      active,
      avatar,
      children,
      content,
      disabled,
      header,
      meta,
      onClick,
      tools,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Item, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Build the element class list */
  const classes = clsx(
    {
      active,
      disabled,
      clickable: onClick
    },
    'item',
    stateClasses,
    className
  );

  const hasChildren = !childrenUtils.isNil(children);

  /** Define Click Handler */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    /** Avoid click when disabled */
    if (disabled) {
      return;
    }

    /** Call user defined handler */
    if (onClick) {
      onClick(e, props);
    }
  };


  // ----
  // Define Component Memoized Element
  // ----
  const avatarElement = React.useMemo(
    () => !hasChildren && Avatar.create(avatar, {
      autoGenerateKey: false,
      defaultProps   : { disabled }
    }),
    [ avatar, hasChildren, disabled ]
  );

  const contentElement = React.useMemo(
    () => !hasChildren && (header || content || meta) && ItemContent.create({
      header,
      content,
      meta
    }, {
      autoGenerateKey: false
    }),
    [ hasChildren, header, content, meta ]
  );

  const toolsElement = React.useMemo(
    () => !hasChildren && ItemTools.create(tools, {
      autoGenerateKey: false
    }),
    [ hasChildren, tools ]
  );

  // ----
  // Component render with declared children
  // ----
  if (hasChildren) {
    return (
      <ElementType {...rest} onClick={handleClick} className={classes}>
        {children}
      </ElementType>
    );
  }


  // ----
  // Component render with shorthand
  // ----
  return (
    <ElementType {...rest} onClick={handleClick} className={classes}>
      {avatarElement}
      {contentElement}
      {toolsElement}
    </ElementType>
  );
};

Item.displayName = 'Item';

Item.Avatar = Avatar;
Item.Content = ItemContent;
Item.Tools = ItemTools;
Item.Group = ItemGroup;

Item.create = createShorthandFactory(Item, (content) => ({ content }));

export default Item;
