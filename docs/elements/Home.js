import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Layout, Header, Spacer, Panel, Divider } from '../../src/react';

const Home = () => (
  <Layout>
    <Header textAlign='center'>
      <Header.Content>
        REACT BUCKET UI DOCUMENTATION
      </Header.Content>
    </Header>
    <Panel header='BUTTON' subheader='React Bucket UI button and button group documentation'>
      <Panel.Body>
        <Link to='/button'>
          <Button primary inverted content='button documentation' />
        </Link>
      </Panel.Body>
    </Panel>
    <Panel header='Checkbox' subheader='React Bucket UI checkbox documentation'>
      <Panel.Body>
        <Link to='/checkbox'>
          <Button primary inverted content='checkbox documentation' />
        </Link>
      </Panel.Body>
    </Panel>
  </Layout>
);

export default Home;
