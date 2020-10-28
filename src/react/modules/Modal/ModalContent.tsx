import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';
import { CreatableFunctionComponent } from '../../generic';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { ModalContentProps } from './ModalContent.types';


/* --------
 * Component Declare
 * -------- */
type ModalContentComponent = CreatableFunctionComponent<ModalContentProps>;


/* --------
 * Component Render
 * -------- */
const ModalContent: ModalContentComponent = (props) => {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ModalContent, props);

  /** Build the element class list */
  const classes = clsx(
    'modal-content',
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
      {content}
    </ElementType>
  );
};

ModalContent.displayName = 'ModalContent';

ModalContent.create = createShorthandFactory(ModalContent, (content) => ({ content }));

export default ModalContent;
