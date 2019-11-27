import React from 'react';
import * as reactIs from 'react-is';

import { isObject } from '@appbuckets/rabbit';

import { Hero, Header, Panel, Layout, Spacer } from '../../../src/react';

import ComponentProps from './ComponentProps';

const withComponentDoc = specs => class ComponentDocs extends React.PureComponent {

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
      examples,
      props
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
              <ComponentProps propsList={props} />
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
