/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/require-optimization */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import { Link } from 'react-router-dom';

import { Table, Button, Layout, Header, Spacer, Panel, Divider, Checkbox, Form } from '../../src/react';

class CheckboxDocumentation extends React.Component {

  state = {
    props: true
  }

  handleChange = (e, { value }) => this.setState({ value });

  handleProps = () => {

    const { props } = this.state;

    this.setState({
      props: !props
    });

  };

  contentToShow = () => {

    if (this.state.props === false) {
      return (
        <Layout>
          <Header textAlign='center'>
            <Header.Content>
              PROPS
            </Header.Content>
          </Header>
          <Spacer />
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell><code>as</code></Table.Cell>
                <Table.Cell>any</Table.Cell>
                <Table.Cell>An element used to render the component</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>checked</code></Table.Cell>
                <Table.Cell>boolean</Table.Cell>
                <Table.Cell>Set the checked state</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>children</code></Table.Cell>
                <Table.Cell>react element</Table.Cell>
                <Table.Cell>Children Node</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>className</code></Table.Cell>
                <Table.Cell>String</Table.Cell>
                <Table.Cell>User defined class</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>defaultChecked</code></Table.Cell>
                <Table.Cell>boolean</Table.Cell>
                <Table.Cell>Initial checked value</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>ID</code></Table.Cell>
                <Table.Cell>String / Number</Table.Cell>
                <Table.Cell>Element ID</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>name</code></Table.Cell>
                <Table.Cell>String</Table.Cell>
                <Table.Cell>HTML Element name</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>radio</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Format a Checkbox using radio style</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>readOnly</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Set the readonly state for a checkbox</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>disabled</code></Table.Cell>
                <Table.Cell>boolean</Table.Cell>
                <Table.Cell>Disable a Checkbox</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>indeterminate</code></Table.Cell>
                <Table.Cell>boolean</Table.Cell>
                <Table.Cell>Indeterminate State</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>label</code></Table.Cell>
                <Table.Cell>react element</Table.Cell>
                <Table.Cell>Label element</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>slider</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Format a checkbox using slider style</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>tabIndex</code></Table.Cell>
                <Table.Cell>String / Number</Table.Cell>
                <Table.Cell>Set the TabIndex</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>toggle</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Format to show a Toggle element</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>value</code></Table.Cell>
                <Table.Cell>String / Number</Table.Cell>
                <Table.Cell>HTML Input Value</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Layout>
      );
    }
    return (
      <Layout>
        <Header textAlign='center'>
          <Header.Content>
            TYPES
          </Header.Content>
        </Header>
        <Spacer />
        <Panel header='Checkbox' subheader='A box for checking'>
          <Panel.Body>
            <Checkbox label='Check this option' />
          </Panel.Body>
        </Panel>
        <Panel header='Toggle' subheader='A checkbox can toggle'>
          <Panel.Body>
            <Checkbox toggle />
          </Panel.Body>
        </Panel>
        <Panel header='Slider' subheader='A checkbox can looks like a slider'>
          <Panel.Body>
            <Checkbox slider />
          </Panel.Body>
        </Panel>
        <Panel header='Radio' subheader='A checkbox can be formatted as a radio element. This means it is an exclusive option.'>
          <Panel.Body>
            <Checkbox radio label='Radio Choice' />
          </Panel.Body>
        </Panel>
        <Panel header='Radio Group' subheader='Radios in group must be controlled components'>
          <Panel.Body>
            <Form>
              <p>Selected value: <b>{this.state.value}</b></p>
              <Checkbox
                radio
                label='Choose this'
                value='this'
                checked={this.state.value === 'this'}
                onChange={this.handleChange}
              />
              <Checkbox
                radio
                label='Choose that'
                value='that'
                checked={this.state.value === 'that'}
                onChange={this.handleChange}
              />
            </Form>
          </Panel.Body>
        </Panel>
        <Panel header='Read Only' subheader='A checkbox can be read only and unable to change states'>
          <Panel.Body>
            <Checkbox readOnly label='read only' />
          </Panel.Body>
        </Panel>
        <Panel header='Checked' subheader='A checkbox can be checked by default'>
          <Panel.Body>
            <Checkbox defaultChecked label='default checked' />
          </Panel.Body>
        </Panel>
        <Panel header='Indeterminate' subheader='A checkbox can be indeterminate'>
          <Panel.Body>
            <Checkbox defaultIndeterminate label='this checkbox is indeterminate' />
          </Panel.Body>
        </Panel>
        <Panel header='Disabled' subheader='A checkbox can be disabled and read-only'>
          <Panel.Body>
            <Checkbox disabled label='disabled' />
            <Checkbox toggle disabled label='disabled' />
          </Panel.Body>
        </Panel>
      </Layout>
    );
  }

  render() {
    return (
      <Layout>
        <Header>
          <Header.Content>
            Checkbox
          </Header.Content>
          <Header.Subheader>
            A checkbox allows user to select a value from a small set of options, often binary.
          </Header.Subheader>
          <Spacer />
          <Header.Subheader>
            <Checkbox slider onClick={this.handleProps} label='props' />
          </Header.Subheader>
        </Header>
        <Spacer />
        <this.contentToShow />
      </Layout>
    );
  }
}

export default CheckboxDocumentation;
