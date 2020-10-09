import * as React from 'react';

import {
  OptionTypeBase,
  Props as ReactSelectProps,
  ActionMeta
} from 'react-select';

import { CreatableProps } from 'react-select/creatable';

import {
  ReactBucketComponentProps,
  SharedComponentStateProps
} from '../../generic';

import { StrictFieldProps } from '../Field';


// ----
// Define Select Props and Interfaces
// ----
export type SelectProps<OptionType extends OptionTypeBase = DefaultOptionType> =
  ReactBucketComponentProps<StrictSelectProps
    & SharedComponentStateProps
    & StrictFieldProps
    & (StrictMultipleSelectProps<OptionType> | StrictNonMultipleSelectProps<OptionType>)
    & (StrictCreatableSelectProps<OptionType> | StrictNonCreatableSelectProps)>;


// ----
// Types to use Option Type of Select Component
// ----
export type DefaultOptionType = { label: string, value: string };


// ----
// Define Augmented Props types for Select Event
// ----
/** The props passed to event handler in multiple option select */
export type MultiSelectEventProps<OptionType extends OptionTypeBase = DefaultOptionType> = SelectProps<OptionType>
  & { value: ReadonlyArray<OptionType> | null | undefined }
  & { action: null | ActionMeta<OptionType> };

/** The props passed to event handler in single option select */
export type SelectEventProps<OptionType extends OptionTypeBase = DefaultOptionType> = SelectProps<OptionType>
  & { value: OptionType | null | undefined };


// ----
// Define Event Handlers
// ----
export type MultiSelectFocusHandler<OptionType extends OptionTypeBase = DefaultOptionType> = (
  e: React.FocusEvent<HTMLElement>,
  props: MultiSelectEventProps<OptionType>
) => void;

export type MultiSelectChangeHandler<OptionType extends OptionTypeBase = DefaultOptionType> = (
  nothing: null,
  props: MultiSelectEventProps<OptionType>
) => void;

export type SelectFocusHandler<OptionType extends OptionTypeBase = DefaultOptionType> = (
  e: React.FocusEvent<HTMLElement>,
  props: SelectEventProps<OptionType>
) => void;

export type SelectChangeHandler<OptionType extends OptionTypeBase = DefaultOptionType> = (
  nothing: null,
  props: SelectEventProps<OptionType>
) => void;


// ----
// Define Conditionally Interfaces based on Props
// ----
type DefaultSelectPropsWithoutEvents<Props> = Omit<Props, 'onBlur' | 'onChange' | 'onFocus' | 'onMenuClose' | 'onMenuOpen'>;

interface StrictMultipleSelectProps<OptionType extends OptionTypeBase = DefaultOptionType>
  extends DefaultSelectPropsWithoutEvents<ReactSelectProps<OptionType>> {
  /** Define multiple choice select */
  isMulti: true;

  /** On select blur event handler */
  onBlur?: MultiSelectFocusHandler<OptionType>;

  /** On value change event handler */
  onChange?: MultiSelectChangeHandler<OptionType>;

  /** On select focus event handler */
  onFocus?: MultiSelectChangeHandler<OptionType>;

  /** On menu Close event Handler */
  onMenuClose?: MultiSelectChangeHandler<OptionType>;

  /** On menu Open event Handler */
  onMenuOpen?: MultiSelectChangeHandler<OptionType>;
}

interface StrictNonMultipleSelectProps<OptionType extends OptionTypeBase = DefaultOptionType>
  extends DefaultSelectPropsWithoutEvents<ReactSelectProps<OptionType>> {
  /** Define select as single choice */
  isMulti: false;

  /** On select blur event handler */
  onBlur?: SelectFocusHandler<OptionType>;

  /** On value change event handler */
  onChange?: SelectChangeHandler<OptionType>;

  /** On select focus event handler */
  onFocus?: SelectChangeHandler<OptionType>;

  /** On menu Close event Handler */
  onMenuClose?: SelectChangeHandler<OptionType>;

  /** On menu Open event Handler */
  onMenuOpen?: SelectChangeHandler<OptionType>;
}

interface StrictCreatableSelectProps<OptionType extends OptionTypeBase = DefaultOptionType> extends CreatableProps<OptionType> {
  /** Set the Select as Creatable */
  creatable: true;
}

interface StrictNonCreatableSelectProps {
  /** Set the Select as Non Creatable */
  creatable: false;
}


// ----
// Define shared component props
// ----
interface StrictSelectProps<OptionType extends OptionTypeBase = DefaultOptionType> {
  /** Disable the Select */
  disabled?: boolean;

  /** Set if select is single or multiple */
  isMulti: boolean;

  /** Set the Loading State */
  loading?: boolean;

  /** Set the Select as Readonly */
  readOnly?: boolean;
}
