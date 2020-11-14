import * as React from 'react';
import { AutoSpacer } from '../../hoc/AutoSpacer';
import VirtualizedTable from './VirtualizedTable';


export default { title: 'Modules/VirtualizedTable' };

type Data = {
  _id: number;
  title: string;
  description: string;
};

export const baseTable = () => {

  const data = new Array(10000).fill(1).map<Data>((value, index) => ({
    _id        : index,
    title      : `Product ${index}`,
    description: `Some description for product number ${index}`
  }));

  return (
    <AutoSpacer disableWidth>
      {({ width, height }) => (
        <VirtualizedTable<Data>
          data={data}
          height={height}
          headerHeight={40}
          rowHeight={58}
          width={width}
          defaultSort={[ 'title' ]}
          columns={[
            {
              width : width / 3,
              key   : 'title',
              header: 'Titolo',
              cell  : {
                header : (item) => `Titolo del Prodotto: ${item.title}`,
                content: (item: Data) => item.description
              },
              sort  : [ 'title' ]
            },
            {
              width : width / 3,
              key   : 'description',
              header: 'Descrizione',
              sort  : [ 'description' ]
            },
            {
              width : width / 3,
              key   : 'status',
              header: 'Status',
              cell  : {
                content: 'Non Ordinato'
              }
            }
          ]}
        />
      )}
    </AutoSpacer>
  );
};
