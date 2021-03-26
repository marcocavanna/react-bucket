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

import { Icon } from '../../elements/Icon';

import { MenuItemProps } from './MenuItem.types';


/* --------
 * Component Declare
 * -------- */
type MenuItemComponent = CreatableFunctionComponent<MenuItemProps>;


/* --------
 * Component Render
 * -------- */
const MenuItem: MenuItemComponent = (receivedProps) => {

  const props = useWithDefaultProps('menuItem', receivedProps);

  const {
    className,
    rest: {
      active,
      children,
      content,
      disabled,
      icon,
      onClick,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(MenuItem, props);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }

    e.stopPropagation();

    if (typeof onClick === 'function') {
      onClick(e, props);
    }
  };

  const classes = clsx(
    {
      active,
      disabled
    },
    'menu-item',
    className
  );

  const iconElement = React.useMemo(
    () => Icon.create(icon, { autoGenerateKey: false }),
    [ icon ]
  );

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {iconElement}
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

MenuItem.displayName = 'MenuItem';

MenuItem.create = createShorthandFactory(
  MenuItem,
  (content) => ({ content })
);

export default MenuItem;
