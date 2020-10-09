import * as React from 'react';
import clsx from 'clsx';

import TextareaAutosize from 'react-textarea-autosize';

import { useElementType, useSharedClassName, useSplitStateClassName } from '../../lib';

import { useTabIndex } from '../../hooks/useTabIndex';

import { Field } from '../Field';

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
      selectAllOnClick,
      value,
      textareaProps,

      /** Overridden Input Handlers */
      onClick: userDefinedOnClick,
      onChange: userDefinedOnChange,
      onBlur: userDefinedOnBlur,
      onFocus: userDefinedOnFocus,

      /** Shared Input/Field Props */
      disabled,
      required,
      readOnly,

      /** Strict Field Props */
      actions,
      actionsPosition,
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
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  /* --------
   * Component Classes
   * -------- */
  const classes = clsx(
    { required, disabled },
    'text',
    stateClassName,
    className
  );

  /* --------
   * Input Handlers
   * -------- */
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }

    /** Remove focus from field */
    if (fieldRef.current) {
      fieldRef.current.classList.remove('focused');
    }

    /** Remove Input Class */
    if (inputRef.current) {
      inputRef.current.classList.remove('focused');
    }

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
    if (fieldRef.current) {
      fieldRef.current.classList.add('dirty');
    }

    /** Set dirty class on input too */
    if (inputRef.current) {
      inputRef.current.classList.add('dirty');
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
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }

    if (inputRef.current && selectAllOnClick) {
      inputRef.current.setSelectionRange(0, inputRef.current.value.length);
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
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }

    /** Set field as Focused */
    if (fieldRef.current) {
      fieldRef.current.classList.add('touched');
      fieldRef.current.classList.add('focused');
    }

    /** Set the Input Class */
    if (inputRef.current) {
      inputRef.current.classList.add('focused');
      inputRef.current.classList.add('touched');
    }

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
  const tabIndex = useTabIndex({
    disabled,
    readOnly,
    prop: userDefinedTabIndex
  });

  /* --------
   * Input Render
   * -------- */
  const renderInputElement = () => {
    const baseProps: any = {
      value,
      disabled,
      required,
      tabIndex,
      readOnly,
      className   : classes,
      autoComplete: 'off',
      type        : type || 'text',
      onBlur      : handleInputBlur,
      onChange    : handleInputChange,
      onClick     : handleInputClick,
      onFocus     : handleInputFocus
    };

    if (currency) {
      return null;
    }

    if (textarea) {
      return (
        <TextareaAutosize
          {...rest}
          inputRef={inputRef as React.RefObject<HTMLTextAreaElement>}
          {...textareaProps}
          {...baseProps}
        />
      );
    }

    return (
      <input
        {...rest}
        ref={inputRef as React.RefObject<HTMLInputElement>}
        {...baseProps}
      />
    );
  };


  /* --------
   * Component Render
   * -------- */
  return (
    <Field
      as={ElementType}
      ref={fieldRef}
      disabled={disabled}
      required={required}
      actions={actions}
      actionsPosition={actionsPosition}
      contentClassName={contentClassName}
      hint={hint}
      hintClassName={hintClassName}
      icon={icon}
      iconPosition={iconPosition}
      label={label}
      readOnly={readOnly}
      appearance={rawRest.appearance}
      danger={rawRest.danger}
      info={rawRest.info}
      primary={rawRest.primary}
      secondary={rawRest.secondary}
      success={rawRest.success}
      warning={rawRest.warning}
      contentType={'input'}
    >
      {renderInputElement()}
    </Field>
  );
}

Input.displayName = 'Input';

Input.defaultProps = {
  textareaProps: {
    minRows: 2,
    maxRows: 8
  },
  type         : 'text'
} as Partial<InputProps>;
