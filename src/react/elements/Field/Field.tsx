import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { FieldProps } from './Field.types';
import { Icon } from '../Icon';
import { ButtonGroup } from '../Button';
import { ReactBucketForwardedRefComponent } from '../../generic';


const Field: ReactBucketForwardedRefComponent<FieldProps> = React.forwardRef<HTMLDivElement>((
  props: FieldProps,
  ref
) => {
  const {
    className,
    rest: {
      actions,
      actionsPosition,
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
      readOnly,
      contentType,
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);


  /* --------
   * Define Classes to Use
   * -------- */
  const classes = clsx(
    {
      required,
      disabled,
      dirty   : isDirty,
      focused : isFocused,
      touched : isTouched,
      readonly: readOnly
    },
    contentType,
    'field',
    stateClassName,
    className
  );

  const containerClasses = React.useMemo(
    () => clsx(
      {
        'action-on-left' : actions?.length && actionsPosition === 'left',
        'action-on-right': actions?.length && actionsPosition === 'right'
      },
      'wrapper'
    ),
    [
      actions,
      actionsPosition
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
  const actionsElement = React.useMemo(
    () => {
      if (actions?.length) {
        return ButtonGroup.create(actions, { autoGenerateKey: true });
      }

      return null;
    },
    [ actions ]
  );

  const leftFieldContent = React.useMemo(
    () => ((actionsElement && actionsPosition === 'left')) && (
      <div className={'addon left'}>
        {actionsPosition === 'left' && actionsElement}
      </div>
    ),
    [
      actionsElement,
      actionsPosition,
      icon,
      iconPosition
    ]
  );

  const rightFieldContent = React.useMemo(
    () => ((actionsElement && actionsPosition === 'right')) && (
      <div className={'addon right'}>
        {actionsPosition === 'right' && actionsElement}
      </div>
    ),
    [
      actionsElement,
      actionsPosition,
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
    <div {...rest} ref={ref} className={classes}>
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
    </div>
  );
});

Field.defaultProps = {
  actionsPosition: 'right',
  iconPosition   : 'left'
} as Partial<Pick<FieldProps, React.ReactText> & React.RefAttributes<HTMLDivElement>>;

Field.create = createShorthandFactory(Field, content => ({ content }));

export default Field;
