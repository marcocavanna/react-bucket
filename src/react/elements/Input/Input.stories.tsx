import * as React from 'react';

import { Input } from './';


export default { title: 'Elements/Input', component: Input };


export const defaultInput = () => {

  return (
    <Input
      placeholder={'Il tuo Nome'}
      label={'Nome'}
      actions={[
        {
          key    : 1,
          icon   : 'check',
          tooltip: 'Conferma'
        },
        {
          key    : 2,
          icon   : 'times',
          tooltip: 'Conferma'
        }
      ]}
      icon={{
        name: 'user'
      }}
    />
  );
};

