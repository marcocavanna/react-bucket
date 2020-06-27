import * as React from 'react';
import clsx from 'clsx';

import {
  useSharedClassName,
  useElementType
} from '../../lib';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { ButtonGroupProps } from './ButtonGroup.types';
import Button from './Button';
import { ShorthandCollection } from '../../generic';
import { ButtonProps } from './Button.types';


export default function ButtonGroup(props: ButtonGroupProps): React.ReactElement<ButtonGroupProps> {

  const {
    className,
    rest: {
      children,
      content,
      buttons,
      full,
      vertical,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the Element Type */
  const ElementType = useElementType(ButtonGroup, props);

  /** Build Component Classes */
  const classes = clsx(
    { full, vertical },
    'buttons',
    className
  );

  /** If children are defined return the element */
  const hasChildren = !childrenUtils.isNil(children);
  if (hasChildren || content) {
    return (
      <ElementType {...rest} className={classes}>
        {!hasChildren ? content : children}
      </ElementType>
    );
  }

  /** Generate Buttons */
  const buttonsElement = Array.isArray(buttons)
    ? buttons.map((buttonProps) => Button.create(buttonProps, { autoGenerateKey: true }))
    : [];

  /** Return the Group */
  return (
    <ElementType {...rest} className={classes}>
      {buttonsElement}
    </ElementType>
  );
}

/** Properly Set displayName */
ButtonGroup.displayName = 'ButtonGroup';

/** Implements the Create Factory Method */
ButtonGroup.create = createShorthandFactory(
  ButtonGroup,
  (buttons) => ({ buttons: buttons as ShorthandCollection<ButtonProps> })
);
