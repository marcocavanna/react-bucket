/* eslint-disable class-methods-use-this */
/* eslint-disable react/require-optimization */
import React from 'react';

import { Button, Layout, Header, Spacer, Panel, Divider, Checkbox, Table } from '../../src/react';

class ButtonDocumentation extends React.Component {

  state = {
    props: true
  }

  handleProps = () => {

    const { props } = this.state;

    this.setState({
      props: !props
    });
  };

  contentToShow = () => {

    const { props } = this.state;

    if (props === false) {
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
                <Table.Cell>Any</Table.Cell>
                <Table.Cell>An element used to render</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>children</code></Table.Cell>
                <Table.Cell>React Element</Table.Cell>
                <Table.Cell>Children Node</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>circle</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Circle Button</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>color</code></Table.Cell>
                <Table.Cell>String</Table.Cell>
                <Table.Cell>Button Background color</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>content</code></Table.Cell>
                <Table.Cell>Any</Table.Cell>
                <Table.Cell>Button Content</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>danger</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Danger Color</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>disabled</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Disabled State</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>flat</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Display Button as Flat</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>icon</code></Table.Cell>
                <Table.Cell>Boolean / AppBucketsICON</Table.Cell>
                <Table.Cell>Icon Property or Definition</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>info</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Info Color</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>fab</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Generate Button as Fab</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>full</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Set fullwidth Button</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>iconPosition</code></Table.Cell>
                <Table.Cell>left / right</Table.Cell>
                <Table.Cell>Icon position</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>inverted</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Inverted Colore</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>loading</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Button with Loader</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>primary</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Primary Color</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>role</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Role Attributes</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>rounded</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Render Rounded Button</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>secondary</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Secondary Color</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>size</code></Table.Cell>
                <Table.Cell>AppBucketsSIZE</Table.Cell>
                <Table.Cell>Change Button Size</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>success</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Success Color</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>tabIndex</code></Table.Cell>
                <Table.Cell>Number</Table.Cell>
                <Table.Cell>Tab Index Order</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><code>warning</code></Table.Cell>
                <Table.Cell>Boolean</Table.Cell>
                <Table.Cell>Warning Color</Table.Cell>
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
        <Panel header='Button' subheader='A standard button.'>
          <Panel.Body>
            <Button>Click here</Button>
          </Panel.Body>
        </Panel>
        <Panel header='Colored' subheader='A button can be colorized'>
          <Panel.Body>
            <Button primary>primary</Button>
            <Button secondary>secondary</Button>
            <Button danger inverted>inverted</Button>
          </Panel.Body>
        </Panel>
        <Panel header='Icon' subheader='Using icon property it is possible to add any fontawesome icon to your button.'>
          <Panel.Body>
            <Button icon='info' content='info button' />
          </Panel.Body>
        </Panel>
        <Panel header='Icon' subheader='It is possible to manage the icon position'>
          <Panel.Body>
            <Button icon='info' iconPosition='right' content='icon right' />
          </Panel.Body>
        </Panel>
        <Panel header='Simple Icon' subheader='It is also possible to use only the icon in the button without a text'>
          <Panel.Body>
            <Button icon='globe' />
          </Panel.Body>
        </Panel>
        <Panel header='Circle Icon' subheader='An icon can also be rounded'>
          <Panel.Body>
            <Button circle icon='facebook' />
            <Button circle icon='twitter' />
            <Button circle icon='instagram' />
            <Button circle icon='youtube' />
            <Button circle icon='pinterest' />
          </Panel.Body>
        </Panel>
        <Panel header='Flat' subheader='A button can be flat, using flat property'>
          <Panel.Body>
            <Button flat>Flat button</Button>
          </Panel.Body>
        </Panel>
        <Panel header='Full' subheader='Using full property a button will be full sized'>
          <Panel.Body>
            <Button full>full size button</Button>
          </Panel.Body>
        </Panel>
        <Panel header='Disabled' subheader='It is possible to disable a button, using disabled property'>
          <Panel.Body>
            <Button disabled>disabled</Button>
          </Panel.Body>
        </Panel>
        <Panel header='Loading' subheader='It is possible to create a loading button'>
          <Panel.Body>
            <Button loading content='is loading' />
          </Panel.Body>
        </Panel>
        <Spacer />
        <Header textAlign='center'>
          <Header.Content>
        GROUPS
          </Header.Content>
        </Header>
        <Spacer />
        <Panel header='Group' subheader='Buttons can exist togheter as a group'>
          <Panel.Body>
            <Button.Group>
              <Button content='one' />
              <Button content='two' />
              <Button content='three' />
            </Button.Group>
          </Panel.Body>
        </Panel>
        <Panel header='Vertical Group' subheader='It is possible to use vertical property to get a vertical group of buttons'>
          <Panel.Body>
            <Button.Group vertical>
              <Button content='one' />
              <Button content='two' />
              <Button content='three' />
            </Button.Group>
          </Panel.Body>
        </Panel>
        <Panel header='Full' subheader='It is possible to get full sized buttons group'>
          <Panel.Body>
            <Button.Group full>
              <Button content='one' />
              <Button content='two' />
              <Button content='three' />
            </Button.Group>
            <Divider />
            <Button.Group full vertical>
              <Button content='one' />
              <Button content='two' />
              <Button content='three' />
            </Button.Group>
          </Panel.Body>
        </Panel>
        <Panel header='Icon' subheader='Button groups can show groups of icons'>
          <Panel.Body>
            <Button.Group>
              <Button icon='save' />
              <Button icon='print' />
              <Button icon='file' />
              <Button icon='pencil alt' />
              <Button icon='share' />
            </Button.Group>
            <Divider />
            <Button.Group vertical>
              <Button icon='save' />
              <Button icon='print' />
              <Button icon='file' />
              <Button icon='pencil alt' />
              <Button icon='share' />
            </Button.Group>
          </Panel.Body>
        </Panel>
        <Panel header='Labeled' subheader='Groups can be formatted as labeled icons'>
          <Panel.Body>
            <Button.Group vertical>
              <Button icon='save' content='save' />
              <Button icon='print' content='print' />
              <Button icon='pencil alt' content='modify' />
              <Button icon='share' content='share' />
            </Button.Group>
          </Panel.Body>
        </Panel>
        <Spacer />
        <Header textAlign='center'>
          <Header.Content>
        CONTENT
          </Header.Content>
        </Header>
        <Spacer />
        <Panel header='Special Colors' subheader='Buttons can have special colors depending on the actions'>
          <Panel.Body>
            <Button success content='success' />
            <Button warning content='warning' />
            <Button danger content='danger' />
            <Button info content='info' />
          </Panel.Body>
        </Panel>
        <Panel header='Inverted' subheader='It is possible to use inverted property to invert che color of the button'>
          <Panel.Body>
            <Button success inverted content='success' />
            <Button warning inverted content='warning' />
            <Button danger inverted content='danger' />
            <Button info inverted content='info' />
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
          Button
          </Header.Content>
          <Header.Subheader>
            A Button indicates a possible user action.
          </Header.Subheader>
          <Spacer />
          <Header.Subheader>
            <Checkbox slider label='props' onClick={this.handleProps} />
          </Header.Subheader>
        </Header>
        <Spacer />
        <this.contentToShow />
      </Layout>
    );
  }
}

export default ButtonDocumentation;
