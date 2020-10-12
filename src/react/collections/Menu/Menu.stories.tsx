import * as React from 'react';

import { Menu } from './index';


export default { title: 'Collections/Menu', component: Menu };


export const baseMenu = () => {
  return (
    <Menu
      items={[
        { content: 'Pagina 1', icon: 'plus' },
        { content: 'Pagina 2', icon: 'user' }
      ]}
    />
  );
};
