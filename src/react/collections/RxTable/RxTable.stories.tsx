import * as React from 'react';

import { RxTable, RxTableColumnProps } from './index';


export default { title: 'Collections/RxTable', component: RxTable };

interface User {
  name: string;

  surname: string;

  email: string;
}

const data: User[] = [
  { name: 'Marco', surname: 'Cavanna', email: 'marco@appbuckets.io' },
  { name: 'Enrico', surname: 'Serra', email: 'serra@protea.srl' },
  { name: 'Nicola', surname: 'Merlitti', email: 'merlitti@protea.srl' }
];

const columns: RxTableColumnProps<User>[] = [
  {
    key   : 'name',
    header: 'Name',
    sort  : [ 'name' ],
    filter: {
      type: 'input',
      show: (search, row) => {
        return new RegExp(search).test(row.name);
      }
    }
  }, {
    key   : 'surname',
    header: 'Surname',
    sort  : [ 'surname' ],
    filter: {
      type: 'input',
      show: (search, row) => {
        return new RegExp(search).test(row.surname);
      }
    }
  }
];

export const directData = () => {
  return (
    <RxTable
      columns={columns}
      data={data}
      filterLogic={'or'}
      rowKey={'email'}
    />
  );
};

export const AsyncLoadData = () => {

  const handleLoadData = React.useCallback(
    () => new Promise<User[]>((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 300000);
    }),
    []
  );

  return (
    <RxTable
      columns={columns}
      data={handleLoadData}
      filterLogic={'or'}
      rowKey={'email'}
    />
  );
};
