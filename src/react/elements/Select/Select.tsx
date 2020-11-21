import { MutableRefObject } from 'react';
import * as React from 'react';
import clsx from 'clsx';

import ReactSelect, {
  ActionMeta,
  Props as ReactSelectProps,
  ValueType
} from 'react-select';

import CreatableReactSelect, {
  Props as CreatableReactSelectProps
} from 'react-select/creatable';

import {
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import {
  useSharedClassName,
  useSplitStateClassName,
  splitFieldProps
} from '../../lib';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';

import { Field } from '../Field';

import { SelectOption, SelectDefaultOption, SelectProps } from './Select.types';


/* --------
 * Component Declare
 * -------- */
export type SelectComponent<Option extends SelectOption = SelectDefaultOption> =
  CreatableFunctionComponent<SelectProps<Option>>;

export type MutableReactSelect<Option> = ReactSelect<Option> | CreatableReactSelect<Option>;
type MutableReactSelectProps<Option> = ReactSelectProps<Option> | CreatableReactSelectProps<Option>;


/* --------
 * Component Render
 * -------- */
const SelectRender: React.ForwardRefRenderFunction<MutableReactSelect<SelectDefaultOption>, SelectProps> = (
  <Option extends SelectOption = SelectDefaultOption>(
    props: React.PropsWithChildren<SelectProps<Option>>,
    ref: ((instance: MutableReactSelect<Option> | null) => void) | MutableRefObject<MutableReactSelect<Option> | null> | null
  ) => {

    /** Split props from className */
    const {
      className,
      rest: {
        /** Strict Select Component Props */
        creatable,
        getOptionValue: userDefinedGetOptionValue,
        loading,
        tabIndex      : userDefinedTabIndex,

        /** Select Event Handler */
        onBlur: userDefinedOnBlur,
        onChange: userDefinedOnChange,
        onFocus: userDefinedOnFocus,
        onInputChange: userDefinedOnInputChange,
        onMenuClose: userDefinedOnMenuClose,
        onMenuOpen: userDefinedOnMenuOpen,
        onMenuScrollToBottom: userDefinedOnMenuScrollToBottom,
        onMenuScrollToTop: userDefinedOnMenuScrollToTop,

        /** React Select Props */
        inputValue: userDefinedInputValue,
        defaultInputValue: userDefinedDefaultInputValue,
        value: userDefinedValue,
        defaultValue: userDefinedDefaultValue,

        /** All other props */
        ...rawRest
      }
    } = useSharedClassName(props);


    // ----
    // Split Props
    // ----
    const [ stateClasses, compoundProps ] = useSplitStateClassName(rawRest);
    const [ fieldProps, rest ] = splitFieldProps(compoundProps);


    // ----
    // Define Internal State and Variables
    // ----
    const [ inputValue, trySetInputValue ] = useAutoControlledValue('', {
      prop       : userDefinedInputValue,
      defaultProp: userDefinedDefaultInputValue
    });

    const [ value, trySetValue ] = useAutoControlledValue(null, {
      prop       : userDefinedValue,
      defaultProp: userDefinedDefaultValue
    });

    const fieldRef = React.useRef<HTMLDivElement>(null);
    const selectRef = React.useRef<MutableReactSelect<Option>>(null);

    React.useLayoutEffect(
      () => {
        if (typeof ref === 'function') {
          ref(selectRef.current);
        }
        else if (ref) {
          ref.current = selectRef.current;
        }
      },
      [ ref ]
    );


    // ----
    // Define the Element and its computed props
    // ----
    const ElementType: React.ElementType<MutableReactSelectProps<Option>> = creatable
      ? CreatableReactSelect
      : ReactSelect;

    const tabIndex = React.useMemo<string | undefined>(
      () => {
        if (fieldProps.disabled || fieldProps.readOnly) {
          return '-1';
        }

        if (userDefinedTabIndex !== undefined && userDefinedTabIndex !== null) {
          return userDefinedTabIndex.toString();
        }

        return undefined;
      },
      [
        fieldProps.disabled,
        fieldProps.readOnly,
        userDefinedTabIndex
      ]
    );

    const classes = clsx(
      {
        required   : fieldProps.required,
        'read-only': fieldProps.readOnly,
        disabled   : fieldProps.disabled
      },
      'react-select',
      stateClasses,
      className
    );


    // ----
    // Get the Current Select Value using its ref
    // ----
    const getOptionValue = React.useCallback(
      (option: Option) => {
        /** If function has not be defined, return as is */
        if (!userDefinedGetOptionValue) {
          return (option?.value as string) ?? '';
        }

        const optionValue = userDefinedGetOptionValue(option);

        if (optionValue === undefined || optionValue === null) {
          return '';
        }

        if (typeof optionValue !== 'string') {
          return optionValue.toString();
        }

        return optionValue;
      },
      [ userDefinedGetOptionValue ]
    );

    const getSelectedValue: any = () => {
      const { value: selectedValue } = (selectRef.current?.state as any);

      if (props.isMulti) {
        return selectedValue ?? [];
      }

      return selectedValue ?? null;
    };


    // ----
    // Component Handlers
    // ----
    const handleSelectBlur = (e: React.FocusEvent<HTMLElement>) => {
      /** Abort if Disabled or ReadOnly */
      if (fieldProps.disabled || fieldProps.readOnly) {
        return;
      }

      /** Remove focused class from field */
      fieldRef.current?.classList.remove('focused');

      /** Get the selected value */
      if (userDefinedOnBlur) {
        userDefinedOnBlur(e, {
          ...props,
          inputValue,
          value : getSelectedValue(),
          action: null
        });
      }
    };

    const handleSelectChange = (selectedValue: ValueType<Option>, action: ActionMeta<Option>) => {
      /** Set field as Dirty */
      fieldRef.current?.classList.add('dirty');

      if (userDefinedOnChange) {
        userDefinedOnChange(null, {
          ...props,
          action,
          inputValue,
          value: (selectedValue as Option) ?? (props.isMulti ? [] : null)
        });
      }

      trySetValue(selectedValue as Option);
    };

    const handleSelectFocus = (e: React.FocusEvent<HTMLElement>) => {
      /** Abort if Disabled or ReadOnly */
      if (fieldProps.disabled || fieldProps.readOnly) {
        return;
      }

      /** Remove focused class from field */
      fieldRef.current?.classList.add('focused');
      fieldRef.current?.classList.add('touched');

      /** Get the selected value */
      if (userDefinedOnFocus) {
        userDefinedOnFocus(e, {
          ...props,
          inputValue,
          value : getSelectedValue(),
          action: null
        });
      }
    };

    const handleInputChange = (newInputValue: string) => {
      if (userDefinedOnInputChange) {
        userDefinedOnInputChange(null, {
          ...props,
          inputValue: newInputValue,
          value     : getSelectedValue(),
          action    : null
        });
      }

      trySetInputValue(newInputValue);
    };

    const handleMenuOpen = () => {
      if (userDefinedOnMenuOpen) {
        userDefinedOnMenuOpen(null, {
          ...props,
          inputValue,
          value : getSelectedValue(),
          action: null
        });
      }
    };

    const handleMenuClose = () => {
      if (userDefinedOnMenuClose) {
        userDefinedOnMenuClose(null, {
          ...props,
          inputValue,
          value : getSelectedValue(),
          action: null
        });
      }
    };

    const handleMenuScrollToBottom = (e: React.SyntheticEvent<HTMLElement>) => {
      if (userDefinedOnMenuScrollToBottom) {
        userDefinedOnMenuScrollToBottom(e, {
          ...props,
          inputValue,
          value : getSelectedValue(),
          action: null
        });
      }
    };

    const handleMenuScrollToTop = (e: React.SyntheticEvent<HTMLElement>) => {
      if (userDefinedOnMenuScrollToTop) {
        userDefinedOnMenuScrollToTop(e, {
          ...props,
          inputValue,
          value : getSelectedValue(),
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
        {...fieldProps}
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
          ref={ref}
          className={classes}
          classNamePrefix={' '}
          getOptionValue={getOptionValue}
          isDisabled={fieldProps.disabled}
          isLoading={loading}
          tabIndex={tabIndex}
          inputValue={inputValue}
          value={value}
          onBlur={handleSelectBlur}
          onChange={handleSelectChange}
          onFocus={handleSelectFocus}
          onMenuClose={handleMenuClose}
          onMenuOpen={handleMenuOpen}
          onMenuScrollToBottom={handleMenuScrollToBottom}
          onMenuScrollToTop={handleMenuScrollToTop}
          onInputChange={handleInputChange}
        />
      </Field>
    );
  }
);

const Select: <Option extends SelectOption = SelectDefaultOption>(
  props: React.PropsWithChildren<SelectProps<Option>>
) => (React.ReactElement<Option> | null) = (
  React.forwardRef(SelectRender) as (...args: any[]) => React.ReactElement
);

(Select as SelectComponent).displayName = 'Select';

(Select as SelectComponent).defaultProps = {};

(Select as SelectComponent).create = createShorthandFactory<SelectProps>(Select, (options) => ({
  options: options as SelectDefaultOption[]
}));

export default Select;
