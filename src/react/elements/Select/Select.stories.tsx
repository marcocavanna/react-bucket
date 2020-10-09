import * as React from 'react';
import { Select } from './index';


export default { title: 'Elements/Select', component: Select };

export const baseSelect = () => {

  return (
    <React.Fragment>
      <Select
        creatable={true}
        isMulti={false}
        options={[
          { label: 'Option 1', value: '1' }
        ]}
      />
    </React.Fragment>
  );
};
