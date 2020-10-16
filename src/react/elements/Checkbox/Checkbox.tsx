import * as React from 'react';
import clsx from 'clsx';

import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';
import { useTabIndex } from '../../hooks/useTabIndex';

import { CheckboxProps } from './Checkbox.types';
import { Field } from '../Field';


export default function Checkbox(props: CheckboxProps) {

  const {
    className,
    rest: {
      /** Strict Checkbox Props */
      checked    : checkedProp,
      defaultChecked,
      radio,
      tabIndex   : userDefinedTabIndex,
      type,
      onChecked  : handleChecked,
      onClick    : handleClick,
      onUnchecked: handleUnchecked,

      /** Overridden Checkbox Handlers */

      /** Shared Checkbox/Field Props */
      disabled,
      required,
      readOnly,

      /** Strict Field Props */
      contentClassName,
      hint,
      hintClassName,
      icon,
      iconPosition,
      label,

      /** All other Checkbox props */
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);
  const ElementType = useElementType(Checkbox, props);


  /* --------
   * AutoControlled Checked State
   * -------- */
  const [ checked, trySetChecked ] = useAutoControlledValue(false, { prop: checkedProp, defaultProp: defaultChecked });


  /* --------
   * Internal Component Ref
   * -------- */
  const fieldRef = React.useRef<HTMLDivElement>(null!);


  /* --------
   * Change Field Classes based on State
   * -------- */
  React.useEffect(
    () => {
      if (!fieldRef.current) {
        return;
      }

      if (checked) {
        fieldRef.current.classList.add('checked');
      }
      else {
        fieldRef.current.classList.remove('checked');
      }
    },
    [ checked, fieldRef ]
  );


  /* --------
   * Component Classes
   * -------- */
  const classes = clsx(
    { required, disabled, checked },
    radio ? 'radio' : 'checkbox',
    stateClassName,
    className
  );


  /* --------
   * Internal Checkbox Props
   * -------- */
  const canToggle = React.useMemo(
    () => !disabled && !readOnly && !(radio && checked),
    [ disabled, readOnly, radio, checked ]
  );

  const tabIndex = useTabIndex({
    disabled,
    readOnly,
    prop: userDefinedTabIndex
  });


  /* --------
   * Component Handlers
   * -------- */
  const handleLabelClick = React.useCallback(
    (e: React.MouseEvent<HTMLLabelElement>) => {
      /** If checkbox could not toggle, return */
      if (!canToggle) {
        return;
      }

      /** Build the Handler Params to be reused */
      const changeHandlerParams: [ React.MouseEvent<HTMLLabelElement>, CheckboxProps ] = [
        e,
        { ...props, checked: !checked }
      ];

      /** Call user defined Handlers */
      if (handleClick) {
        handleClick(...changeHandlerParams);
      }

      if (!checked && handleChecked) {
        handleChecked(...changeHandlerParams);
      }
      else if (checked && handleUnchecked) {
        handleUnchecked(...changeHandlerParams);
      }

      /** Try to set the internal auto controlled state */
      trySetChecked(!checked);
    },
    [
      canToggle,
      checked,
      handleClick,
      handleChecked,
      handleUnchecked
    ]
  );


  /* --------
   * Memoized Component Element
   * -------- */
  const labelElement = React.useMemo(
    () => (
      <label
        htmlFor={rest.id}
        onClick={handleLabelClick}
      >{label}</label>
    ),
    [
      rest.id,
      handleLabelClick,
      label
    ]
  );


  /* --------
   * Component Render
   * -------- */
  return (
    <Field
      as={ElementType}
      ref={fieldRef}
      disabled={disabled}
      required={required}
      contentClassName={contentClassName}
      hint={hint}
      hintClassName={hintClassName}
      icon={icon}
      iconPosition={iconPosition}
      readOnly={readOnly}
      appearance={rawRest.appearance}
      danger={rawRest.danger}
      info={rawRest.info}
      primary={rawRest.primary}
      secondary={rawRest.secondary}
      success={rawRest.success}
      warning={rawRest.warning}
      contentType={radio ? 'radio' : 'checkbox'}
    >
      <input
        {...rest}
        readOnly
        className={classes}
        disabled={disabled}
        checked={checked}
        tabIndex={tabIndex}
        type={radio ? 'radio' : 'checkbox'}
      />
      {labelElement}
    </Field>
  );
}