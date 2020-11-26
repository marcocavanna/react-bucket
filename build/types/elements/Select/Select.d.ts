import * as React from 'react';
import ReactSelect from 'react-select';
import CreatableReactSelect from 'react-select/creatable';
import { CreatableFunctionComponent } from '../../generic';
import { SelectOption, SelectDefaultOption, SelectProps } from './Select.types';
export declare type SelectComponent<
  Option extends SelectOption = SelectDefaultOption
> = CreatableFunctionComponent<SelectProps<Option>>;
export declare type MutableReactSelect<Option> =
  | ReactSelect<Option>
  | CreatableReactSelect<Option>;
declare const Select: <Option extends SelectOption = SelectDefaultOption>(
  props: React.PropsWithChildren<SelectProps<Option>>
) => React.ReactElement<Option> | null;
export default Select;
