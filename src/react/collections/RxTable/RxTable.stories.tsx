import * as React from 'react';

import { RxTable, RxTableColumns } from './index';


export default { title: 'Collections/RxTable' };

interface User {
  name: string;

  surname: string;

  email: string;
}

export const baseTable = () => {

  const data: User[] = [
    { name: 'Marco', surname: 'Cavanna', email: 'marco@appbuckets.io' },
    { name: 'Enrico', surname: 'Serra', email: 'serra@protea.srl' },
    { name: 'Nicola', surname: 'Merlitti', email: 'merlitti@protea.srl' }
  ];

  const columns: RxTableColumns<User> = [
    { title: 'Name', dataIndex: 'name', key: 'name', width: 500, className: 'has-text-danger' },
    { title: 'Surname', dataIndex: 'surname', key: 'surname', width: 250 },
    {
      title: 'Email', key: 'email', render: (_, user) => ({
        props: {
          primary: true,
          header : user.email,
          content: 'Write!'
        }
      }),
      width: 250
    }
  ];

  return (
    <RxTable
      initiallyLoading={false}
      columns={columns}
      data={data}
      rowKey={'name'}
      scroll={{ x: true }}
    />
  );

};
