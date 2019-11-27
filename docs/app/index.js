/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SideBar, Home } from './component';

import withComponentDoc from './HOC/with-component-doc';
import * as Docs from './docs';

import Layout from '../../src/react/collections/Layout';


const App = () => (
  <BrowserRouter>
    <Layout fluid>
      <Layout.Row>
        <Layout.Column is={2}>
          <SideBar />
        </Layout.Column>
        <Layout.Column is={10}>
          <Switch>
            <Route exact path='/' component={Home} />
            {
              Object
                .getOwnPropertyNames(Docs)
                .filter(Component => Component !== '__esModule')
                .map(Component => (
                  <Route
                    key={Component}
                    path={Docs[Component].path}
                    component={withComponentDoc(Docs[Component])}
                  />
                ))
            }
          </Switch>
        </Layout.Column>
      </Layout.Row>
    </Layout>
  </BrowserRouter>
);

export default App;
