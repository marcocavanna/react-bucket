import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  getElementType,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { HeaderContentProps } from './HeaderContent.types';
import { getSharedClassNames } from '../../lib';


export default function HeaderContent(props: HeaderContentProps): React.ReactElement<HeaderContentProps> {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = getSharedClassNames(props);

  const ElementType = getElementType(HeaderContent, props);

  const classes = clsx(
    'content',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

HeaderContent.displayName = 'HeaderContent';

HeaderContent.defaultProps = {
  as: 'h3' as React.ElementType
};

HeaderContent.create = createShorthandFactory(HeaderContent, content => ({ content }));
