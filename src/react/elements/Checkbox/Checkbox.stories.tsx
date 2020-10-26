import * as React from 'react';

import { Checkbox } from '.';


export default { title: 'Elements/Checkbox', component: Checkbox };

export const baseCheckbox = () => {

  return (
    <Checkbox
      success
      label={'I Accept TOS and Privacy Policy'}
    />
  );

};
