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

import { useWithDefaultProps } from '../../context/BucketContext';

import { ModalHeaderProps } from './ModalHeader.types';

import { Header } from '../../elements/Header';


/* --------
 * Component Declare
 * -------- */
type ModalHeaderComponent = CreatableFunctionComponent<ModalHeaderProps>;


/* --------
 * Component Render
 * -------- */
const ModalHeader: ModalHeaderComponent = (receivedProps) => {

  const props = useWithDefaultProps('modalHeader', receivedProps);

  const {
    className,
    rest: {
      actions,
      children,
      content,
      disabled,
      divided,
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

  /** Build a memoized Header */
  const headerElement = React.useMemo(
    () => Header.create({
      actions,
      content,
      disabled,
      divided,
      icon,
      subheader
    }, { autoGenerateKey: false }),
    [
      actions,
      content,
      disabled,
      divided,
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
      {headerElement}
      {metaElement}
    </ElementType>
  );
};

ModalHeader.displayName = 'ModalHeader';

ModalHeader.create = createShorthandFactory(ModalHeader, (content) => ({ content }));

export default ModalHeader;
