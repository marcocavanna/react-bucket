import React from 'react';
import PropTypes from 'prop-types';

import { Table } from '../../../src/react';

function RenderPropTable(props) {

  const { propsData } = props;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

RenderPropTable.propTypes = {
  propsData: PropTypes.object
};

export default RenderPropTable;
