import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useSharedClassName,
  useElementType
} from '../../lib';

import { CreatableFunctionComponent, ShorthandCollection } from '../../generic';

import { ButtonGroupProps } from './ButtonGroup.types';

import { ButtonComponent } from './Button';
import { ButtonProps } from './Button.types';


/* --------
 * Import ButtonGroup async to avoid circular dependencies
 * -------- */
let Button: ButtonComponent | null = null;

import('./Button').then(({ default: buttonComponent }) => {
  Button = buttonComponent;
});


/* --------
 * Component Declare
 * -------- */
type ButtonGroupComponent = CreatableFunctionComponent<ButtonGroupProps>;


/* --------
 * Component Render
 * -------- */
const ButtonGroup: ButtonGroupComponent = (props) => {

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
    ? buttons.map((buttonProps) => Button && Button.create(buttonProps, { autoGenerateKey: true }))
    : [];

  /** Return the Group */
  return (
    <ElementType {...rest} className={classes}>
      {buttonsElement}
    </ElementType>
  );
};

/** Properly Set displayName */
ButtonGroup.displayName = 'ButtonGroup';

/** Implements the Create Factory Method */
ButtonGroup.create = createShorthandFactory(
  ButtonGroup,
  (buttons) => ({
    buttons: buttons as ShorthandCollection<ButtonProps>
  })
);

export default ButtonGroup;
