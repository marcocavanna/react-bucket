import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { FieldProps } from './Field.types';
import { Icon } from '../Icon';
import { Button } from '../Button';


export default function Field(props: FieldProps): React.ReactElement<FieldProps> {

  const {
    className,
    rest: {
      action,
      actionPosition,
      children,
      content,
      contentClassName,
      disabled,
      hint,
      hintClassName,
      icon,
      iconPosition,
      isFocused,
      isDirty,
      isTouched,
      label,
      required,
      ...rest
    }
  } = useSharedClassName(props);


  /* --------
   * Get Correct Element Type
   * -------- */
  const ElementType = useElementType(Field, props);


  /* --------
   * Define Classes to Use
   * -------- */
  const classes = clsx(
    {
      required,
      disabled,
      dirty  : isDirty,
      focused: isFocused,
      touched: isTouched
    },
    'field',
    className
  );

  const containerClasses = React.useMemo(
    () => clsx(
      {
        'action-on-left' : !!action && actionPosition === 'left',
        'action-on-right': !!action && actionPosition === 'right'
      },
      'container'
    ),
    [
      action,
      actionPosition
    ]
  );

  const contentClasses = React.useMemo(
    () => clsx(
      'content',
      {
        'icon-on-left' : !!icon && iconPosition === 'left',
        'icon-on-right': !!icon && iconPosition === 'right'
      },
      contentClassName
    ),
    [
      contentClassName,
      icon,
      iconPosition
    ]
  );


  /* --------
   * Compute Field Addon
   * -------- */
  const leftFieldContent = React.useMemo(
    () => ((action && actionPosition === 'left')) && (
      <div className={'addon left'}>
        {action && actionPosition === 'left' && Button.create(action, { autoGenerateKey: false })}
      </div>
    ),
    [
      action,
      actionPosition,
      icon,
      iconPosition
    ]
  );

  const rightFieldContent = React.useMemo(
    () => ((action && actionPosition === 'right')) && (
      <div className={'addon right'}>
        {action && actionPosition === 'right' && Button.create(action, { autoGenerateKey: false })}
      </div>
    ),
    [
      action,
      actionPosition,
      icon,
      iconPosition
    ]
  );

  const iconContent = React.useMemo(
    () => icon && Icon.create(icon, { autoGenerateKey: false }),
    [ icon ]
  );

  const hintClasses = React.useMemo(
    () => clsx(
      'addon down',
      'hint',
      hintClassName
    ),
    [ hintClassName ]
  );

  const hintContent = React.useMemo(
    () => hint && (
      <div className={hintClasses}>
        {hint}
      </div>
    ),
    [ hint, hintClassName ]
  );


  /* --------
   * Render Component
   * -------- */
  return (
    <ElementType {...rest} className={classes}>
      {label && <label>{label}</label>}

      <div className={containerClasses}>
        {leftFieldContent}
        <div className={contentClasses}>
          {iconPosition === 'left' && iconContent}
          {childrenUtils.isNil(children) ? content : children}
          {iconPosition === 'right' && iconContent}
        </div>
        {rightFieldContent}
      </div>

      {hintContent}
    </ElementType>
  );

}

Field.defaultProps = {
  actionPosition: 'right',
  iconPosition  : 'left'
} as Partial<FieldProps>;

Field.create = createShorthandFactory(Field, content => ({ content }));
