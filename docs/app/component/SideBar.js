import React from 'react';
import { NavLink, Link } from 'react-router-dom';

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
          <NavLink key={Component} to={Docs[Component].path}>
            <Menu.Item icon={Docs[Component].icon} content={Component} />
          </NavLink>
        ))
    }
  </Menu>
);

export default SideBar;
