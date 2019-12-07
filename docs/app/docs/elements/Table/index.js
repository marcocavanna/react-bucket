import React from 'react';

import TableInfo from '../../component-info/Table.info.json';
import loadComponentInfo from '../../util/loadComponentInfo';

import { Table } from '../../../../../src/react';

export default {

  path: '/table',

  icon: 'table',

  hero: {
    header  : 'Table',
    content : 'A table displays a collections of data grouped into rows'
  },

  props: {

    Table: {
      ...loadComponentInfo(TableInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Table',
      subheader : 'A standard Table',
      content   : (
        <React.Fragment>
          <Table
            style={{ tableLayout: 'initial' }}
            headerRow={[
              <Table.HeaderCell key={1} textAlign='center' content='first header' />,
              <Table.HeaderCell key={2} textAlign='center' content='second header' />,
              <Table.HeaderCell key={3} textAlign='center' content='third header' />
            ]}
            tableData='due'
            renderBodyRow={() => (
              <Table.Row
                cells={[
                  <Table.Cell key={1} textAlign='center' content='cell one' />,
                  <Table.Cell key={2} textAlign='center' content='cell two' />,
                  <Table.Cell key={3} textAlign='center' content='cell three' />
                ]}
              />
            )}
          />
        </React.Fragment>
      )
    }

  }

};
