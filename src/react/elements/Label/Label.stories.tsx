import * as React from 'react';
import { Label } from './index';


export default { title: 'Elements/Label', component: Label };

export const baseLabel = () => {

  return (
    <>
      <Label disabled primary content={'Quarto'} removable />
    </>
  );
};
