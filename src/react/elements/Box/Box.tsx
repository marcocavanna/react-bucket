import * as React from 'react';
import clsx from 'clsx';

import {
  getElementType,
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  getSharedClassNames
} from '../../lib';

import { BoxProps } from './Box.types';


const appendValueToClass = (
  prefix: string,
  prop: string | number | undefined
): string | undefined => typeof prop === 'number' || typeof prop === 'string'
  ? `${prefix}-${prop}`
  : undefined;


export default function Box(props: BoxProps): React.ReactElement<BoxProps> {

  const {
    className,
    rest: {
      children,
      content,
      elevation,
      m,
      mb,
      ml,
      mr,
      mt,
      mx,
      my,
      p,
      pb,
      pl,
      pr,
      pt,
      px,
      py,
      ...rest
    }
  } = getSharedClassNames(props);

  const ElementType = getElementType(Box, props);

  const classes = clsx(
    'box',
    appendValueToClass('elevation', elevation),
    appendValueToClass('m', m),
    appendValueToClass('mb', mb),
    appendValueToClass('ml', ml),
    appendValueToClass('mr', mr),
    appendValueToClass('mt', mt),
    appendValueToClass('mx', mx),
    appendValueToClass('my', my),
    appendValueToClass('p', p),
    appendValueToClass('pb', pb),
    appendValueToClass('pl', pl),
    appendValueToClass('pr', pr),
    appendValueToClass('pt', pt),
    appendValueToClass('px', px),
    appendValueToClass('py', py),
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

Box.displayName = 'Box';
