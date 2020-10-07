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

import { ModalHeaderProps } from './ModalHeader.types';

import { Header } from '../../elements/Header';


export default function ModalHeader(props: ModalHeaderProps): React.ReactElement<ModalHeaderProps> {

  const {
    className,
    rest: {
      children,
      content,
      icon,
      meta,
      subheader,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ModalHeader, props);

  /** Build the element class list */
  const classes = clsx(
    'modal-header',
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

  /** Build a memoized Header */
  const headerElement = React.useMemo(
    () => Header.create({
      content,
      icon,
      subheader
    }, { autoGenerateKey: false }),
    [
      content,
      icon,
      subheader
    ]
  );

  const metaElement = React.useMemo(
    () => meta && (
      <div className={'modal-meta'}>
        {meta}
      </div>
    ),
    [ meta ]
  );

  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
      {metaElement}
    </ElementType>
  );
}

ModalHeader.displayName = 'ModalHeader';

ModalHeader.create = createShorthandFactory(ModalHeader, (content) => ({ content }));
