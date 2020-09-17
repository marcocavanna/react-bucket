import * as React from 'react';

import { Input } from './';


export default { title: 'Elements/Input', component: Input };


export const defaultInput = () => {

  return (
    <Input
      danger
      placeholder={'Il tuo Nome'}
      label={'Nome'}
      action={{
        icon: 'check'
      }}
      icon={'user'}
    />
  );
};

