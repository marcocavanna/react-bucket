import React from 'react';

import { isObject } from '@appbuckets/rabbit';

import { Checkbox, Hero, Header, Panel, Layout, Table, Spacer } from '../../../src/react';

const withComponentDoc = specs => class ComponentDocs extends React.PureComponent {

  state = {
    viewProps: false
  }

  handlePropsVisibleChange = () => this.setState(({ viewProps }) => ({ viewProps: !viewProps }))

  renderProps = (props) => {
    /** If not an Object, return null */
    if (!isObject(props)) {
      return null;
    }

    /** Return props Panels */
    return (
      <React.Fragment>

        <Header content='Props' textAlign='center' />

        <Table
          headerRow={['Name', 'Type', 'Description']}
          tableData={props}
          renderBodyRow={(data, index) => (
            <Table.Row
              cells={[
                <Table.Cell key={1} content={<code>{index}</code>} />,
                <Table.Cell key={2} content={data.type} />,
                <Table.Cell key={3} content={data.comment} />
              ]}
            />
          )}
        />

      </React.Fragment>
    );
  }

  renderExamples = (examples) => {
    /** If not an Object, return null */
    if (!isObject(examples)) {
      return null;
    }

    /** Return Examples Panels */
    return (
      <React.Fragment>

        <Header content='Examples' textAlign='center' />

        {
          Object
            .getOwnPropertyNames(examples)
            .map(exampleKey => (
              <Panel
                key={exampleKey}
                {...examples[exampleKey]}
              />
            ))
        }

      </React.Fragment>
    );
  }

  render() {
    /** Check what i've to render */
    const { viewProps } = this.state;

    /** Destructure Specs */
    const {
      icon,
      hero,
      props,
      examples
    } = specs;

    return (
      <React.Fragment>
        {/* Render the Hero Header */}
        <Hero {...hero} heroIcon={icon} />

        <Spacer height='6' />


        <Layout>
          <Layout.Row>
            <Layout.Column>
              <Checkbox
                slider
                size='large'
                label={viewProps ? 'View Examples' : 'View Props'}
                checked={viewProps}
                onChange={this.handlePropsVisibleChange}
              />

              {/* Render right page section */}
              {viewProps ? this.renderProps(props) : this.renderExamples(examples)}

            </Layout.Column>
          </Layout.Row>
        </Layout>

      </React.Fragment>
    );
  }

};

export default withComponentDoc;
