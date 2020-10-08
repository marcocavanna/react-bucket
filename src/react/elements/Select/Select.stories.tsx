import * as React from 'react';
import { Select } from './index';
import { Input } from '../Input';
import { Box } from '../Box';


export default { title: 'Elements/Select', component: Select };

export const baseSelect = () => {

  return (
    <React.Fragment>
      <Box mb={4}>
        <Select
          isMulti
          actions={[
            {
              content: 'Add',
              primary: true
            }
          ]}
          actionsPosition={'left'}
          options={new Array(10).fill(1).map((el, ix) => ({
            value: `Option ${ix}`,
            label: `Option ${ix}`
          }))}
        />
      </Box>

      <Input
        actions={[
          {
            content: 'Add',
            primary: true
          }
        ]}
        actionsPosition={'left'}
        placeholder={'Select'}
      />
    </React.Fragment>
  );
};
