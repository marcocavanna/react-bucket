import React from 'react';
import * as reactIs from 'react-is';

import { isObject } from '@appbuckets/rabbit';

import { Checkbox, Hero, Header, Panel, Layout, Table, Spacer, Tabs } from '../../../src/react';

const withComponentDoc = specs => class ComponentDocs extends React.PureComponent {

  state = {
    viewProps: false
  }

  handlePropsVisibleChange = () => this.setState(({ viewProps }) => ({ viewProps: !viewProps }))

  renderPropsTable = propsData => (
    <Table
      style={{ tableLayout: 'initial' }}
      headerRow={[
        <Table.HeaderCell key={1} textAlign='right' content='Name' />,
        'Type',
        'Description'
      ]}
      tableData={propsData}
      renderBodyRow={(data, index) => (
        <Table.Row
          cells={[
            <Table.Cell key={1} textAlign='right' content={<code>{index}</code>} />,
            <Table.Cell key={2} content={data.type} />,
            <Table.Cell key={3} content={data.comment} />
          ]}
        />
      )}
    />
  )

  renderProps = (props) => {
    /** If not an Object, return null */
    if (!isObject(props)) {
      return null;
    }

    /** Get ViewProps from State */
    const { viewProps } = this.state;

    /** Check if must render Tabs */
    const propsSection = Object.getOwnPropertyNames(props);

    /** Return props Panels */
    return (
      <React.Fragment>

        <Checkbox
          slider
          size='large'
          label={viewProps ? 'View Examples' : 'View Props'}
          checked={viewProps}
          onChange={this.handlePropsVisibleChange}
        />

        {viewProps && propsSection.length > 0 && (
          <React.Fragment>
            {/* Show Header */}
            <Header content='Props' textAlign='center' />

            {/* Show Props Tabs */}
            {propsSection.length === 1
              ? this.renderPropsTable(props[propsSection[0]])
              : (
                <Tabs
                  panels={propsSection.map(sectionKey => ({
                    trigger : sectionKey,
                    panel   : this.renderPropsTable(props[sectionKey])
                  }))}
                />
              )}
          </React.Fragment>
        )}

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
            .map((exampleKey) => {
              const {
                content: Content,
                ...restPanelProps
              } = examples[exampleKey];

              return (
                <Panel
                  key={exampleKey}
                  id={exampleKey}
                  {...restPanelProps}
                  content={reactIs.isElement(Content) ? Content : <Content />}
                />
              );
            })
        }

      </React.Fragment>
    );
  }

  render() {

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

              {/* Render Props Section */}
              {this.renderProps(props)}

              {/* Render Examples */}
              {this.renderExamples(examples)}

            </Layout.Column>
          </Layout.Row>
        </Layout>

      </React.Fragment>
    );
  }

};

export default withComponentDoc;
