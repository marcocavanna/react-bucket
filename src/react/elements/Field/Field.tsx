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
      hint,
      hintClassName,
      icon,
      iconPosition,
      label,
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
    'field',
    className
  );

  const contentClasses = React.useMemo(
    () => clsx(
      'content',
      contentClassName
    ),
    [ contentClassName ]
  );

  const hintClasses = React.useMemo(
    () => clsx(
      'hint',
      hintClassName
    ),
    [ hintClassName ]
  );


  /* --------
   * Compute Field Addon
   * -------- */
  const leftFieldContent = React.useMemo(
    () => (
      <React.Fragment>
        {action && actionPosition === 'left' && Button.create(action, { autoGenerateKey: false })}
        {icon && iconPosition === 'left' && Icon.create(icon, { autoGenerateKey: false })}
      </React.Fragment>
    ),
    [
      action,
      actionPosition,
      icon,
      iconPosition
    ]
  );

  const rightFieldContent = React.useMemo(
    () => (
      <React.Fragment>
        {icon && iconPosition === 'right' && Icon.create(icon, { autoGenerateKey: false })}
        {action && actionPosition === 'right' && Button.create(action, { autoGenerateKey: false })}
      </React.Fragment>
    ),
    [
      action,
      actionPosition,
      icon,
      iconPosition
    ]
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

      <div className={contentClasses}>
        {leftFieldContent}
        {childrenUtils.isNil(children) ? content : children}
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
