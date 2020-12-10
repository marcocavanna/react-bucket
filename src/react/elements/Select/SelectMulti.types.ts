import { SelectOption, SelectDefaultOption, SelectProps, SelectEventProps } from './Select.types';


export interface SelectMultiProps<Option extends SelectOption = SelectDefaultOption, Value = string | number>
  extends SelectProps<Option, Value[], []> {
}


export type SelectMultiEventProps<Option extends SelectOption = SelectDefaultOption, Value = string | number> =
  SelectEventProps<Option, Value[], []>;
