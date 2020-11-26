import { SelectOption, SelectDefaultOption, SelectProps } from './Select.types';
export interface SelectMultiProps<
  Option extends SelectOption = SelectDefaultOption
> extends SelectProps<Option, Option[], []> {}
