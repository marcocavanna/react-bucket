import * as React from 'react';

import { useWithDefaultProps } from '../../context/BucketContext';

import { SelectDefaultOption, SelectOption } from './Select.types';

import { SelectMultiProps } from './SelectMulti.types';

import Select, { SelectComponent } from './Select';


const SelectMulti = <Option extends SelectOption = SelectDefaultOption>(
  receivedProps: React.PropsWithChildren<SelectMultiProps<Option>>
) => {

  const props = useWithDefaultProps('selectMulti', receivedProps);

  return (Select as SelectComponent).create(props as any, {
    autoGenerateKey: false,
    overrideProps  : {
      isMulti: true
    } as any
  });
};

export default SelectMulti;
