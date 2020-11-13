import * as React from 'react';

import { SelectDefaultOption, SelectOption } from './Select.types';

import { SelectMultiProps } from './SelectMulti.types';

import Select, { SelectComponent } from './Select';


const SelectMulti = <Option extends SelectOption = SelectDefaultOption>(
  props: React.PropsWithChildren<SelectMultiProps<Option>>
) => (Select as SelectComponent).create(props as any, {
  autoGenerateKey: false,
  overrideProps  : {
    isMulti: true
  } as any
});

export default SelectMulti;
