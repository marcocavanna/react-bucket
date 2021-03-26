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

import { useWithDefaultProps } from '../../context/BucketContext';

import { DividerProps } from './Divider.types';


/* --------
 * Component Declare
 * -------- */
type DividerComponent = React.FunctionComponent<DividerProps>;


/* --------
 * Component Render
 * -------- */
const Divider: DividerComponent = (receivedProps) => {

  /** Get component props */
  const props = useWithDefaultProps('divider', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Divider, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Check if component has children */
  const hasChildren = !childrenUtils.isNil(children);

  /** Build the element class list */
  const classes = clsx(
    'horizontal',
    (hasChildren || content) && 'text',
    'divider',
    stateClasses,
    className
  );

  /** Component render */
  return (
    <ElementType {...rest} className={classes}>
      {(hasChildren || content) && (
        <div className={'content'}>
          {hasChildren ? children : content}
        </div>
      )}
    </ElementType>
  );

};

Divider.displayName = 'Divider';

export default Divider;
