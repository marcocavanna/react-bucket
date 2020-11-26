import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  CreatableFunctionComponent,
  ShorthandCollection
} from '../../generic';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import {
  useAutoControlledValue
} from '../../hooks/useAutoControlledValue';

import { MenuProps } from './Menu.types';

import MenuItem from './MenuItem';
import { MenuItemProps } from './MenuItem.types';


/* --------
 * Component Declare
 * -------- */
type MenuComponent = CreatableFunctionComponent<MenuProps> & {
  Item: typeof MenuItem
};


/* --------
 * Component Declare
 * -------- */
const Menu: MenuComponent = (props) => {

  const {
    className,
    rest: {
      activeIndex: userDefinedActiveIndex,
      children,
      content,
      defaultActiveIndex,
      items,
      onItemClick,
      secondary,
      tab,
      text,
      vertical,
      ...rest
    }
  } = useSharedClassName(props);

  /** Control Active Index */
  const [ activeIndex, trySetActiveIndex ] = useAutoControlledValue(0, {
    prop       : userDefinedActiveIndex,
    defaultProp: defaultActiveIndex
  });

  /** Get the component element type */
  const ElementType = useElementType(Menu, props);

  /** Build the element class list */
  const classes = clsx(
    {
      secondary,
      tab,
      text,
      vertical
    },
    'menu',
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
      {Array.isArray(items) ? items.map((item, ix) => (
        MenuItem.create(item, {
          autoGenerateKey: true,
          defaultProps   : {
            active: activeIndex === ix,
            index : ix
          },
          overrideProps  : (predefinedProps) => ({
            onClick: (e, itemProps) => {
              /** Extract Index from Props */
              const { index } = itemProps;
              /** Try to set the new Active Index state */
              trySetActiveIndex(index as number);
              /** Invoke props if exists */
              if (onItemClick) {
                onItemClick(e, itemProps);
              }
              if (predefinedProps.onClick) {
                predefinedProps.onClick(e, itemProps);
              }
            }
          })
        })
      )) : content}
    </ElementType>
  );
};

Menu.displayName = 'Menu';

Menu.create = createShorthandFactory(Menu, (items) => ({
  items: items as ShorthandCollection<MenuItemProps>
}));

Menu.Item = MenuItem;

export default Menu;
