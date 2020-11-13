import * as React from 'react';
import { AutoSpacer } from '../../hoc/AutoSpacer';
import VirtualizedTable from './VirtualizedTable';


export default { title: 'Modules/VirtualizedTable' };

export const baseTable = () => {

  const data = new Array(10000).fill(1).map((value, index) => ({
    _id        : index,
    title      : `Product ${index}`,
    description: `Some description for product number ${index}`
  }));

  return (
    <AutoSpacer disableWidth>
      {({ width, height }) => (
        <VirtualizedTable
          data={data}
          height={height}
          headerHeight={40}
          rowHeight={58}
          width={width}
          columns={[
            {
              width : width / 3,
              key   : 'title',
              header: 'Titolo',
              cell  : {
                header: (item) => `Titolo del Prodotto: ${item.title}`
              }
            },
            {
              width : width / 3,
              key   : 'description',
              header: 'Descrizione'
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
