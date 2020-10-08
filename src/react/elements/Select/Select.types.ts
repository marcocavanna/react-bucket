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


export interface SelectProps<IsMulti extends boolean, OptionType extends OptionTypeBase = { label: string, value: string }>
  extends ReactBucketComponentProps<StrictSelectProps<IsMulti, OptionType>>,
    SharedComponentStateProps {
}

type ExcludeSelf<P> = Omit<P, keyof StrictSelectProps<any>>;

type ReactSelectPropsExtended<OptionType> =
  ExcludeSelf<ReactSelectProps<OptionType>>
  & ExcludeSelf<CreatableProps<OptionType>>;

type SelectedOption<IsMulti, OptionType> = IsMulti extends true ? ReadonlyArray<OptionType> : OptionType;

export type EventSelectProps<IsMulti extends boolean, OptionType extends OptionTypeBase = { label: string, value: string }> =
  SelectProps<IsMulti, OptionType>
  & { value: SelectedOption<IsMulti, OptionType> | null | undefined }
  & { action: null | ActionMeta<OptionType> };

export interface StrictSelectProps<IsMulti extends boolean, OptionType extends OptionTypeBase = { label: string, value: string }>
  extends ReactSelectPropsExtended<OptionType>, Omit<StrictFieldProps, 'onChange'> {
  /** Render the Select as a Creatable Select */
  creatable?: boolean;

  /** Disable the Select */
  disabled?: boolean;

  /** Set Select as Multiple Choice */
  isMulti?: IsMulti;

  /** Set the Loading State */
  loading?: boolean;

  /** On Blur Event */
  onBlur?: (e: React.FocusEvent<HTMLElement>, props: EventSelectProps<IsMulti, OptionType>) => void;

  /** On select change event */
  onChange?: (
    nothing: null,
    props: EventSelectProps<IsMulti, OptionType>
  ) => void;

  /** On Focus Handler */
  onFocus?: (e: React.FocusEvent<HTMLElement>, props: EventSelectProps<IsMulti, OptionType>) => void;

  /** Select Options */
  options: OptionType[];

  /** Set the Select as Readonly */
  readOnly?: boolean;
}
