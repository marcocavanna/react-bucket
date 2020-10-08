import * as React from 'react';

import {
  OptionTypeBase,
  Props as ReactSelectProps,
  ValueType,
  ActionMeta
} from 'react-select';


import { CreatableProps } from 'react-select/creatable';

import {
  ReactBucketComponentProps,
  SharedComponentStateProps
} from '../../generic';


export interface SelectProps<OptionType extends OptionTypeBase = { label: string, value: string }>
  extends ReactBucketComponentProps<StrictSelectProps<OptionType>>,
    SharedComponentStateProps {
}

type ExcludeSelf<P> = Omit<P, keyof StrictSelectProps>;

export interface StrictSelectProps<OptionType extends OptionTypeBase = { label: string, value: string }>
  extends ExcludeSelf<ReactSelectProps<OptionType>>,
    ExcludeSelf<CreatableProps<OptionType>> {
  /** Render the Select as a Creatable Select */
  creatable?: boolean;

  /** Disable the Select */
  disabled?: boolean;

  /** Set the Loading State */
  loading?: boolean;

  /** On Blur Event */
  onBlur?: (e: React.FocusEvent<HTMLElement>, props: SelectProps) => void;

  /** On select change event */
  onChange?: (
    nothing: null,
    props: SelectProps & { action: ActionMeta<OptionType>, value: ValueType<OptionType> }
  ) => void;

  /** Select Options */
  options: OptionType[];

  /** Set the Select as Readonly */
  readOnly?: boolean;
}
