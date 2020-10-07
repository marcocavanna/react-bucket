import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils, createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { ModalActionsProps } from './ModalActions.types';

import { Button, ButtonProps } from '../../elements/Button';
import { ShorthandCollection } from '../../generic';


export default function ModalActions(props: ModalActionsProps): React.ReactElement<ModalActionsProps> {

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
}

ModalActions.displayName = 'ModalActions';

ModalActions.create = createShorthandFactory(ModalActions, (value) => ({
  actions: value as ShorthandCollection<ButtonProps>
}));
