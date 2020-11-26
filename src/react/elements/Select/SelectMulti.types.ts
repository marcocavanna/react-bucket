import { SelectOption, SelectDefaultOption, SelectProps } from './Select.types';


export interface SelectMultiProps<Option extends SelectOption = SelectDefaultOption, Value = Option>
  extends SelectProps<Option, Value[], []> {
}
