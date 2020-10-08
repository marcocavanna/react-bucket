import * as React from 'react';
import clsx from 'clsx';

import ReactSelect, {
  Props as ReactSelectProps,
  OptionTypeBase,
  ValueType,
  ActionMeta
} from 'react-select';
import CreatableSelect, { Creatable } from 'react-select/creatable';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { useTabIndex } from '../../hooks/useTabIndex';

import { Field } from '../Field';

import { SelectProps } from './Select.types';


export default function Select<IsMulti extends boolean = false, OptionType extends OptionTypeBase = { label: string, value: string }>(
  props: SelectProps<IsMulti, OptionType>
): React.ReactElement<SelectProps<IsMulti, OptionType>> {

  const {
    className,
    rest: {
      /** Strict Select Props */
      content,
      creatable,
      loading,
      tabIndex: userDefinedTabIndex,

      /** Select Event Handler */
      onBlur: userDefinedOnBlur,
      onChange: userDefinedOnChange,
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

      /** Strip creatable Select Props */
      allowCreateWhileLoading,
      formatCreateLabel,
      isValidNewOption,
      getNewOptionData,
      onCreateOption,
      createOptionPosition,

      ...rawRest
    }
  } = useSharedClassName(props);


  // ----
  // Define Internal State and Variables
  // ----
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const selectRef = React.useRef<ReactSelect | CreatableSelect<OptionType> | null>(null);

  /** Get Element Type */
  const ElementType: React.ElementType<Creatable<OptionType> | ReactSelectProps<OptionType>> = creatable
    ? CreatableSelect
    : ReactSelect;

  /** Compute TabIndex */
  const computedTabIndex = useTabIndex({
    disabled,
    prop: userDefinedTabIndex,
    readOnly
  });

  const tabIndex = React.useMemo(
    () => computedTabIndex?.toString(),
    [ computedTabIndex ]
  );

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Build the element class list */
  const classes = clsx(
    { required, disabled },
    'react-select',
    stateClasses,
    className
  );


  // ----
  // Define Handlers
  // ----
  const handleSelectBlur = (e: React.FocusEvent<HTMLElement>) => {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }

    /** Remove focus from field */
    if (fieldRef.current) {
      fieldRef.current.classList.remove('focused');
    }

    /** Get Selected Value */
    const value = (selectRef.current?.state as any).value;

    if (userDefinedOnBlur) {
      userDefinedOnBlur(e, {
        ...props,
        value,
        action: null
      });
    }
  };

  const handleSelectChange = (value: ValueType<OptionType>, action: ActionMeta<OptionType>) => {
    /** Set field as Dirty */
    if (fieldRef.current) {
      fieldRef.current.classList.add('dirty');
    }

    /** Call user defined handler */
    if (userDefinedOnChange) {
      userDefinedOnChange(null, {
        ...props,
        value,
        action
      });
    }
  };

  const handleSelectFocus = (e: React.FocusEvent<HTMLElement>) => {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }

    /** Set field as Focused */
    if (fieldRef.current) {
      fieldRef.current.classList.add('touched');
      fieldRef.current.classList.add('focused');
    }

    /** Get Selected Value */
    const value = (selectRef.current?.state as any).value;

    /** Call user defined handled */
    if (userDefinedOnFocus) {
      userDefinedOnFocus(e, {
        ...props,
        value,
        action: null
      });
    }
  };


  // ----
  // Render the Component
  // ----
  return (
    <Field
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
      contentType={'select input'}
    >
      <ElementType
        {...rest}
        ref={selectRef as any}
        className={classes}
        classNamePrefix={' '}
        isDisabled={disabled}
        isLoading={loading}
        tabIndex={tabIndex}
        onBlur={handleSelectBlur}
        onChange={handleSelectChange}
        onFocus={handleSelectFocus}
      />
    </Field>
  );
}

Select.displayName = 'Select';

Select.defaultProps = {
  creatable    : false,
  isClearable  : true,
  menuPlacement: 'auto',
  options      : []
} as Partial<SelectProps<any, any>>;
