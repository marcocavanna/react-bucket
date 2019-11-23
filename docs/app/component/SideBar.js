import React from 'react';
import { NavLink } from 'react-router-dom';

import { Menu } from '../../../src/react';

import * as Docs from '../docs';

const SideBar = () => (
  <Menu vertical secondary>
    <NavLink to='/'>
      <Menu.Item disabled icon='info' content='React Bucket UI' />
    </NavLink>
    {
      Object
        .getOwnPropertyNames(Docs)
        .filter(Component => Component !== '__esModule')
        .map(Component => (
          <Menu.Item
            key={Component}
            icon={Docs[Component].icon}
            content={Component}
            as={NavLink}
            to={Docs[Component].path}
            activeClassName='is-active'
          />
        ))
    }
  </Menu>
);

export default SideBar;
