import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { ModalContentProps } from './ModalContent.types';


export default function ModalContent(props: ModalContentProps): React.ReactElement<ModalContentProps> {

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
}

ModalContent.displayName = 'ModalContent';

ModalContent.create = createShorthandFactory(ModalContent, (content) => ({ content }));
