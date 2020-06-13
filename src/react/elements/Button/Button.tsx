import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils,
  classByKey
} from '@appbuckets/react-ui-core';

import { ButtonProps } from './Button.types';
import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';


export default function Button(props: ButtonProps): React.ReactElement<ButtonProps> {

  const {
    className,
    rest: {
      children,
      content,
      disabled,
      flat,
      onClick,
      role,
      tabIndex: userDefinedTabIndex,
      type,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Button, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);


  /**
   * Compute the correct
   * button aria role based on button type
   */
  const ariaRole = React.useMemo<string | null>(() => {
    /** If role is defined, return it */
    if (role != null) {
      return role;
    }
    /** If element is a button, return button */
    if (ElementType === 'button') {
      return 'button';
    }
    /** Else, return null */
    return null;
  }, [ role, ElementType ]);


  /**
   * Compute the right tab index using
   * the disabled prop and/or the original
   * tabIndex property defined by user
   */
  const tabIndex = React.useMemo<number | null>(() => {
    /** If tabIndex has been defined by user return it */
    if (userDefinedTabIndex != null) {
      return userDefinedTabIndex;
    }
    /** If component is disabled, strict tabIndex to -1 */
    if (disabled) {
      return -1;
    }
    /** If the element has been rendered as a 'div' element, return 0 */
    if (ElementType === 'div') {
      return 0;
    }
    /** Fallback to null */
    return null;
  }, [ userDefinedTabIndex, disabled, ElementType ]);


  /** Build an handler for click event */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    /** If button is disabled, prevent any click */
    if (disabled) {
      e.preventDefault();
      return;
    }
    /** If the onClick function exists, invoke it */
    if (typeof onClick === 'function') {
      onClick(e, props);
    }
  };

  /** Build the element class list */
  const classes = clsx(
    'button',
    stateClasses,
    classByKey(flat, 'is-flat'),
    className
  );

  /** Check if component has Children */
  const hasChildren = !childrenUtils.isNil(children);

  /** Return the Element */
  return (
    <ElementType
      {...rest}
      className={classes}
      disabled={(disabled && ElementType === 'button') || undefined}
      role={ariaRole}
      type={type}
      tabIndex={tabIndex}
      onClick={handleClick}
    >
      {hasChildren && children}
      {!hasChildren && content}
    </ElementType>
  );
}

/** Add the Group */
Button.Group = ButtonGroup;

/** Set button Default Props */
Button.defaultProps = {
  as  : 'button' as React.ElementType,
  type: 'button' as 'button'
};

/** Properly set Display Name */
Button.displayName = 'Button';

/** Create the Shorthand Factory Method */
Button.create = createShorthandFactory<ButtonProps>(Button, (content) => ({ content }));
