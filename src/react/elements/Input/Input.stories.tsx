import * as React from 'react';

import { Input } from './';
import { useInputValue } from '../../hooks/useInputValue';


export default { title: 'Elements/Input', component: Input };


export const defaultInput = () => {

  const [ value, handleInputChange ] = useInputValue('');

  return (
    <Input
      clearable
      value={value}
      onChange={handleInputChange}
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


export const defaultTextarea = () => {
  return (
    <Input
      textarea
      placeholder={'Scrivi un commento...'}
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
