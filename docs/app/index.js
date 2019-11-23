/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SideBar from './component/SideBar';
import Home from './pages/Home';

import RightMenu from '../elements/RightMenu';

import withComponentDoc from './HOC/with-component-doc';
import * as Docs from './docs';

// import ButtonDocumentation from '../elements/Button';
// import CheckboxDocumentation from '../elements/Checkbox';

import Layout from '../../src/react/collections/Layout';

/*
<Route path='/button' component={ButtonDocumentation} />
<Route path='/checkbox' component={CheckboxDocumentation} />
*/

const App = () => (
  <BrowserRouter>
    <Layout fluid>
      <Layout.Row>
        <Layout.Column is={2}>
          <SideBar />
        </Layout.Column>
        <Layout.Column is={8}>
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
        <Layout.Column is={2}>
          <RightMenu />
        </Layout.Column>
      </Layout.Row>
    </Layout>
  </BrowserRouter>
);

export default App;
