import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  getElementType,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import { getSharedClassNames } from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { HeaderContentProps } from './HeaderContent.types';


/* --------
 * Component Declare
 * -------- */
type HeaderContentComponent = CreatableFunctionComponent<HeaderContentProps>;

/* --------
 * Component Render
 * -------- */
const HeaderContent: HeaderContentComponent = (receivedProps) => {

  const props = useWithDefaultProps('headerContent', receivedProps);

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

};

HeaderContent.displayName = 'HeaderContent';

HeaderContent.create = createShorthandFactory(HeaderContent, content => ({ content }));

export default HeaderContent;
