import React from 'react';
import PropTypes from 'prop-types';

import { isObject } from '@appbuckets/rabbit';

import { Table, Header, Checkbox, Tabs } from '../../../src/react';

class ComponentProps extends React.PureComponent {

  static propTypes = {
    propsList: PropTypes.object
  }

  state = {
    viewProps: false
  }

  handlePropsVisibleChange = () => this.setState(({ viewProps }) => ({ viewProps: !viewProps }))

  renderPropsTable = propsData => (
    <Table
      style={{ tableLayout: 'initial' }}
      headerRow={[
        <Table.HeaderCell key={1} textAlign='right' content='Name' />,
        'TYpe',
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

  render() {

    const { propsList } = this.props;

    return (
      <React.Fragment>
        {this.renderProps(propsList)}
      </React.Fragment>
    );

  }

}

export default ComponentProps;
