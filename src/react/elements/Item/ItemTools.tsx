import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent, ShorthandCollection, ShorthandItem } from '../../generic';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { Button, ButtonProps } from '../Button';

import { ItemToolsProps } from './ItemTools.types';


/* --------
 * Component Declare
 * -------- */
type ItemToolsComponent = CreatableFunctionComponent<ItemToolsProps>;

/* --------
 * Component Render
 * -------- */
const ItemTools: ItemToolsComponent = (props) => {

  const {
    className,
    rest: {
      children,
      content,
      disabled,
      tools,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemTools, props);

  /** Build the element class list */
  const classes = clsx(
    'tools',
    className
  );

  /** Render Item Tools */
  return (
    <ElementType {...rest} className={classes}>
      {tools && tools.map((tool: ShorthandItem<ButtonProps>) => (
        Button.create(tool, {
          autoGenerateKey: false,
          defaultProps   : {
            disabled,
            flat: true
          }
        })
      ))}
    </ElementType>
  );
};

ItemTools.displayName = 'ItemTools';

ItemTools.create = createShorthandFactory(ItemTools, (tools) => ({ tools: tools as ShorthandCollection<ButtonProps> }));

export default ItemTools;
