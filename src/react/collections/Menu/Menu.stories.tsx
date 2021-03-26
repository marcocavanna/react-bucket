import * as React from 'react';

import { Menu } from './index';


export default { title: 'Collections/Menu', component: Menu };


export const baseMenu = () => {
  return (
    <Menu
      items={[
        { key: 0, content: 'Pagina 1', icon: 'plus' },
        { key: 1, content: 'Pagina 2', icon: 'user' }
      ]}
    />
  );
};
