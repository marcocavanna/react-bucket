import * as React from 'react';
import clsx from 'clsx';

import { useElementType, useSharedClassName, useSplitStateClassName } from '../../lib';

import ControlledStateField from '../Field/ControlledStateField';

import { InputProps } from './Input.types';


export default function Input(props: InputProps): React.ReactElement<InputProps> {

  const {
    className,
    rest: {
      /** Strict Input Props */
      currency,
      textarea,
      type,
      tabIndex: userDefinedTabIndex,
      readOnly,

      /** Overridden Input Handlers */
      onClick: userDefinedOnClick,
      onChange: userDefinedOnChange,
      onBlur: userDefinedOnBlur,
      onFocus: userDefinedOnFocus,

      /** Shared Input/Field Props */
      disabled,
      required,

      /** Strict Field Props */
      action,
      actionPosition,
      contentClassName,
      hint,
      hintClassName,
      icon,
      iconPosition,
      label,

      /** All other input Props */
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);
  const ElementType = useElementType(Input, props);

  /* --------
   * Internal Component Ref
   * -------- */
  const fieldRef = React.useRef<ControlledStateField & HTMLDivElement>(null!);

  /* --------
   * Component Classes
   * -------- */
  const classes = clsx(
    'input',
    { required, disabled },
    stateClassName,
    className
  );

  /* --------
   * Input Handlers
   * -------- */
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    /** Remove focus from field */
    fieldRef.current.setIsFocused(false);

    /** Call user defined handler */
    if (userDefinedOnBlur) {
      userDefinedOnBlur(e, {
        ...props,
        value: e.target.value
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /** Set field as Dirty */
    if (!fieldRef.current.state.isDirty) {
      fieldRef.current.setIsDirty(true);
    }

    /** Call user defined handler */
    if (userDefinedOnChange) {
      userDefinedOnChange(e, {
        ...props,
        value: e.target.value
      });
    }
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    e.stopPropagation();

    if (userDefinedOnClick) {
      userDefinedOnClick(e, {
        ...props,
        value: e.currentTarget.value
      });
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    /** Set field as Focused */
    fieldRef.current.setIsFocused(true);

    /** Call user defined handler */
    if (userDefinedOnFocus) {
      userDefinedOnFocus(e, {
        ...props,
        value: e.target.value
      });
    }
  };

  /* --------
   * Input Computed Properties
   * -------- */
  const tabIndex = React.useMemo(
    () => {
      if (userDefinedTabIndex) {
        return userDefinedTabIndex;
      }

      if (disabled || readOnly) {
        return -1;
      }

      return null;
    },
    [
      userDefinedTabIndex,
      disabled,
      readOnly
    ]
  );

  /* --------
   * Input Render
   * -------- */
  const inputElement = (() => {
    if (currency) {
      return null;
    }

    if (textarea) {
      return null;
    }

    return (
      <input
        {...rest}
        disabled={disabled}
        required={required}
        tabIndex={tabIndex}
        readOnly={readOnly}
        className={classes}
        autoComplete={'off'}
        type={type || 'text'}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onFocus={handleInputFocus}
      />
    );
  })();


  /* --------
   * Component Render
   * -------- */
  return (
    <ControlledStateField
      as={ElementType}
      ref={fieldRef}
      disabled={disabled}
      required={required}
      action={action}
      actionPosition={actionPosition}
      contentClassName={contentClassName}
      hint={hint}
      hintClassName={hintClassName}
      icon={icon}
      iconPosition={iconPosition}
      label={label}
    >
      {inputElement}
    </ControlledStateField>
  );
}
