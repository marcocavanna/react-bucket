import * as React from 'react';
import { MultiSelect } from './index';


export default { title: 'Elements/Select', component: MultiSelect };

export const baseSelect = () => {

  return (
    <React.Fragment>
      <MultiSelect<{ value: string, label: string }>
        isSearchable={false}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' }
        ]}
      />
    </React.Fragment>
  );
};
