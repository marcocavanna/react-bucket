import * as React from 'react';
import { AutoSpacer } from '../../hoc/AutoSpacer';
import VirtualizedTable from './VirtualizedTable';


export default { title: 'Modules/VirtualizedTable' };

type Data = {
  _id: number;
  title: string;
  description: string;
};

export const BaseTable = () => {

  const [ , setSelectedItem ] = React.useState<Data>();

  const data = new Array(10000).fill(1).map<Data>((value, index) => ({
    _id        : index,
    title      : `Product ${index}`,
    description: `Some description for product number ${index}`
  }));

  const handleSelectItem = (item: Data) => {
    setSelectedItem(item);
  };

  return (
    <AutoSpacer disableWidth>
      {({ width, height }) => (
        <VirtualizedTable<Data>
          data={data}
          height={height}
          headerHeight={30}
          filterRowHeight={52}
          rowHeight={58}
          width={width}
          defaultSort={[ 'title' ]}
          onRowClick={handleSelectItem}
          columns={[
            {
              width    : 40,
              widthType: 'percentage',
              key      : 'title',
              header   : 'Titolo',
              cell     : {
                header : (item) => `Titolo del Prodotto: ${item.title}`,
                content: (item: Data) => item.description
              },
              sort     : [ 'title' ],
              filter   : {
                type: 'input',
                show: (value, row) => {
                  return new RegExp(value, 'ig').test(row.title);
                }
              }
            },
            {
              width    : 60,
              widthType: 'percentage',
              key      : 'description',
              header   : 'Descrizione',
              sort     : [ 'description' ]
            },
            {
              width : 100,
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
