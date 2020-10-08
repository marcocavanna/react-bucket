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

import { SelectProps } from './Select.types';


export default function Select<OptionType extends OptionTypeBase = { label: string, value: string }>(
  props: SelectProps<OptionType>
): React.ReactElement<SelectProps<OptionType>> {

  const {
    className,
    rest: {
      content,
      creatable,
      disabled,
      loading,
      readOnly,
      tabIndex: userDefinedTabIndex,

      /** Event Handler */
      onBlur,
      onChange,

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
    'select',
    stateClasses,
    className
  );


  // ----
  // Define Handlers
  // ----
  const handleChange = React.useCallback(
    (value: ValueType<OptionType>, action: ActionMeta<OptionType>) => {
      if (onChange) {
        onChange(null, { ...props, value, action });
      }
    },
    [ onChange ]
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      if (onBlur) {
        onBlur(e, props);
      }
    },
    [ onBlur ]
  );

  // ----
  // Render the Component
  // ----
  return (
    <ElementType
      {...rest}
      ref={selectRef as any}
      className={classes}
      classNamePrefix={'bucket'}
      isDisabled={disabled}
      isLoading={loading}
      tabIndex={tabIndex}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}

Select.displayName = 'Select';

Select.defaultProps = {
  creatable    : false,
  isClearable  : true,
  menuPlacement: 'auto',
  options      : []
} as Partial<SelectProps>;
