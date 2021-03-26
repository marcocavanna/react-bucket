import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils, createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { ModalActionsProps } from './ModalActions.types';

import { Button, ButtonProps } from '../../elements/Button';
import { CreatableFunctionComponent, ShorthandCollection } from '../../generic';


/* --------
 * Component Declare
 * -------- */
type ModalActionsComponent = CreatableFunctionComponent<ModalActionsProps>;


/* --------
 * Component Render
 * -------- */
const ModalActions: ModalActionsComponent = (receivedProps) => {

  const props = useWithDefaultProps('modalActions', receivedProps);

  const {
    className,
    rest: {
      actions,
      children,
      content,
      onActionClick,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ModalActions, props);

  /** Build the element class list */
  const classes = clsx(
    'modal-actions',
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
      {Array.isArray(actions) && actions.map(button => (
        Button.create(button, {
          autoGenerateKey: false,
          overrideProps  : (predefinedProps) => ({
            onClick: (e, buttonProps) => {
              if (predefinedProps.onClick) {
                predefinedProps.onClick(e, buttonProps);
              }

              if (onActionClick) {
                onActionClick(e, buttonProps);
              }
            }
          })
        })
      ))}
    </ElementType>
  );
};

ModalActions.displayName = 'ModalActions';

ModalActions.create = createShorthandFactory(ModalActions, (value) => ({
  actions: value as ShorthandCollection<ButtonProps>
}));

export default ModalActions;
