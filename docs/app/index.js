/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from '../elements/Navbar';
import RightMenu from '../elements/RightMenu';
import Home from '../elements/Home';
import ButtonDocumentation from '../elements/Button';
import CheckboxDocumentation from '../elements/Checkbox';

import Layout from '../../src/react/collections/Layout';

const App = () => (
  <BrowserRouter>
    <Layout fluid>
      <Layout.Row>
        <Layout.Column is={2}>
          <Navbar />
        </Layout.Column>
        <Layout.Column is={8}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/button' component={ButtonDocumentation} />
            <Route path='/checkbox' component={CheckboxDocumentation} />
          </Switch>
        </Layout.Column>
        <Layout.Column is={2}>
          <RightMenu />
        </Layout.Column>
      </Layout.Row>
    </Layout>
  </BrowserRouter>
);

export default App;
