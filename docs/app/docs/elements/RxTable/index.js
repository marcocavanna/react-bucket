import React from 'react';

import RxTableInfo from '../../component-info/RxTable.info.json';
import loadComponentInfo from '../../util/loadComponentInfo';

import { RxTable, RxTableData, Menu } from '../../../../../src/react';

const rxData = new RxTableData([
  {
    name : 'Arthur',
    job  : 'Programmer',
    age  : 36
  },
  {
    name : 'Steven',
    job  : 'Officer',
    age  : 45
  },
  {
    name : 'Mark',
    job  : 'Designer',
    age  : 29
  }
], {
  columns: [
    {
      id      : 'name',
      content : 'Name',
      sort    : 'name'
    },
    {
      id      : 'job',
      content : 'Job',
      sort    : 'job'
    },
    {
      id      : 'age',
      content : 'Age',
      sort    : 'age'
    }
  ],
  sorting: {
    enabled : true,
    initial : 'name'
  }
});

const rxDataTwo = new RxTableData([
  {
    name : 'Arthur',
    job  : 'Programmer',
    age  : 36
  },
  {
    name : 'Steven',
    job  : 'Officer',
    age  : 45
  },
  {
    name : 'Mark',
    job  : 'Designer',
    age  : 29
  }
], {
  columns: [
    {
      id      : 'name',
      content : 'Name',
      sort    : 'name'
    },
    {
      id      : 'job',
      content : 'Job',
      sort    : 'job'
    },
    {
      id      : 'age',
      content : 'Age',
      sort    : 'age'
    }
  ],
  sorting: {
    enabled : true,
    initial : 'name'
  },
  rowTools: {
    tools: () => ([
      <Menu.Item
        key={2}
        icon='pen'
        content='Edit'
      />,
      <Menu.Item
        key={1}
        icon='trash'
        content='Delete'
      />
    ])
  }
});

export default {

  path: '/rxtable',

  icon: 'border all',

  hero: {
    header  : 'Rx Table',
    content : 'An Rx Table is dynamic. It can be a sortable table'
  },

  props: {

    RxTable: {
      ...loadComponentInfo(RxTableInfo)
    }

  },

  examples: {

    standard: {
      header    : 'RxTable',
      subheader : 'Standard Rx Table',
      content   : (
        <React.Fragment>
          <RxTable
            rxTableData={rxData}
          />
        </React.Fragment>
      )
    },

    withTools: {
      header    : 'With Tools',
      subheader : 'It is possible to add a tools list inside each row',
      content   : (
        <React.Fragment>
          <RxTable
            rxTableData={rxDataTwo}
          />
        </React.Fragment>
      )
    },

    rightTools: {
      header    : 'Tools Position',
      subheader : 'The tools list can be setted with left position',
      content   : (
        <React.Fragment>
          <RxTable
            rxTableData={rxDataTwo}
            toolsColumnPosition='left'
          />
        </React.Fragment>
      )
    },

    paginate: {
      header    : 'Paginate',
      subheader : 'An Rx Table can be paginate, with the number of pages in the bottom right angle.',
      content   : (
        <React.Fragment>
          <RxTable
            paginate
            rxTableData={rxData}
          />
        </React.Fragment>
      )
    }
  }

};
