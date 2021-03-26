import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { ContainerProps } from './Container.types';


/* --------
 * Component Declare
 * -------- */
type ContainerComponent = React.FunctionComponent<ContainerProps>;


/* --------
 * Component Render
 * -------- */
const Container: ContainerComponent = (receivedProps) => {

  const props = useWithDefaultProps('container', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      fixedTo,
      fluid,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(Container, props);

  const classes = clsx(
    { fluid },
    fixedTo,
    'container',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

Container.displayName = 'Container';

export default Container;
