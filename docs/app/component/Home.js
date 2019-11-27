import React from 'react';

import { Link } from 'react-router-dom';

import { Layout, Header, HeroButton, Spacer } from '../../../src/react';

import * as Docs from '../docs';

const Home = () => (
  <Layout>
    <Spacer />
    <Header textAlign='center'>
      <Header.Content>
        REACT BUCKET UI DOCUMENTATION
      </Header.Content>
    </Header>
    <Spacer />
    {
      Object
        .getOwnPropertyNames(Docs)
        .filter(Comp => Comp !== '__esModule')
        .map((Comp, Index) => (
          <Link key={Comp} to={Docs[Comp].path}>
            <HeroButton
              key={Comp}
              header={Comp}
              content={`${Comp} Documentation`}
              icon={Docs[Comp].icon}
              variation={Index % 9}
            />
          </Link>
        ))
    }
  </Layout>
);

export default Home;
