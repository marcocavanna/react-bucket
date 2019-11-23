import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Layout, Menu, Button } from '../../src/react';

const Navbar = () => (
  <Menu vertical secondary>
    <NavLink to='/'>
      <Menu.Item disabled icon='info' content='React Bucket UI' />
    </NavLink>
    <NavLink to='/button'>
      <Menu.Item active>
        Buttons
      </Menu.Item>
    </NavLink>
    <NavLink to='/checkbox'>
      <Menu.Item>
        Checkbox
      </Menu.Item>
    </NavLink>
    <Menu.Item>Container</Menu.Item>
    <Menu.Item>Divider</Menu.Item>
    <Menu.Item>Hero</Menu.Item>
    <Menu.Item>Hero Button</Menu.Item>
    <Menu.Item>Icon</Menu.Item>
  </Menu>
);

export default Navbar;
