/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/require-optimization */
import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import { Layout, Menu, DropdownMenu } from '../../src/react';

class RightMenu extends React.Component {

  state = {}

  constructor(props) {
    super(props);

    const { pathname } = this.props.location;

    console.log(pathname);
  }

  render() {
    return (
      <h1>prop dropdown menu</h1>
    );
  }

}

export default withRouter(RightMenu);
