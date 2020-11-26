import * as React from 'react';
import { SelectDefaultOption } from './Select.types';
import { SelectMultiProps } from './SelectMulti.types';
declare const SelectMulti: <Option extends import('../..').AnyObject = SelectDefaultOption>(
  props: React.PropsWithChildren<SelectMultiProps<Option>>
) => React.ReactElement<
  import('./Select.types').SelectProps<
    SelectDefaultOption,
    SelectDefaultOption,
    null
  >,
  | string
  | ((
      props: any
    ) => React.ReactElement<
      any,
      string | any | (new (props: any) => React.Component<any, any, any>)
    > | null)
  | (new (props: any) => React.Component<any, any, any>)
> | null;
export default SelectMulti;
