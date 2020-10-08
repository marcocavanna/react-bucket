import * as React from 'react';
import { Select } from './index';


export default { title: 'Elements/Select', component: Select };

export const baseSelect = () => {
  return (
    <Select
      isMulti
      options={[
        { label: 'Prova', value: 'test' }
      ]}
    />
  );
};
