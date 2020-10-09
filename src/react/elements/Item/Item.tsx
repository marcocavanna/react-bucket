import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { Avatar } from '../Avatar';

import { ItemProps } from './Item.types';


export default function Item(props: ItemProps): React.ReactElement<ItemProps> {

  const {
    className,
    rest: {
      active,
      avatar,
      children,
      content,
      disabled,
      onClick,
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
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      /** Avoid click when disabled */
      if (disabled) {
        return;
      }

      /** Call user defined handler */
      if (onClick) {
        onClick(e, props);
      }
    },
    [ disabled, onClick ]
  );


  // ----
  // Define Component Memoized Element
  // ----
  const avatarElement = React.useMemo(
    () => {
      if (hasChildren || !avatar) {
        return null;
      }

      return Avatar.create(avatar, {
        autoGenerateKey: false,
        defaultProps   : { disabled }
      });
    },
    [ avatar, hasChildren, disabled ]
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
      <div className={'content'}>
        {avatarElement}
      </div>
    </ElementType>
  );
}

Item.displayName = 'Item';

Item.Avatar = Avatar;
