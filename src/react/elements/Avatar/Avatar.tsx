import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { Badge } from '../Badge';
import { Icon } from '../Icon';

import { AvatarProps } from './Avatar.types';
import { Popup } from '../../modules/Popup';


export default function Avatar(props: AvatarProps): React.ReactElement<AvatarProps> {

  const {
    className,
    rest: {
      badge,
      content,
      children,
      disabled,
      icon,
      onClick,
      tooltip,
      type,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Avatar, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Build the element class list */
  const classes = clsx(
    {
      badged   : badge,
      disabled,
      clickable: onClick
    },
    type,
    'avatar',
    stateClasses,
    className
  );

  /** Check if Component has Children */
  const hasChildren = !childrenUtils.isNil(children);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      /** Call user defined handler */
      if (onClick && !disabled) {
        /** Disable event propagation */
        e.stopPropagation();

        onClick(e, props);
      }
    },
    [ onClick, disabled ]
  );


  // ----
  // Build Memoized Element
  // ----
  const avatarContentElement = React.useMemo(
    () => {
      if (hasChildren) {
        return null;
      }

      if (icon) {
        return Icon.create(icon, { autoGenerateKey: false });
      }

      return content;
    },
    [ icon, content, hasChildren ]
  );

  const badgeElement = React.useMemo(
    () => badge === true
      ? <Badge />
      : Badge.create(badge, {
        autoGenerateKey: false
      }),
    [ badge ]
  );


  // ----
  // Build the Element that could be wrapped inside a tooltip
  // ----
  const avatarElement = (
    <ElementType {...rest} onClick={handleClick} className={classes}>
      <div className={'content'}>
        {hasChildren ? children : avatarContentElement}
      </div>
      {badgeElement}
    </ElementType>
  );

  return tooltip && !disabled
    ? (
      <Popup
        trigger={avatarElement}
        content={tooltip}
      />
    )
    : avatarElement;
}

Avatar.displayName = 'Avatar';

Avatar.defaultProps = {
  type: 'round'
} as Partial<AvatarProps>;

Avatar.create = createShorthandFactory(Avatar, (content) => ({ content }));
