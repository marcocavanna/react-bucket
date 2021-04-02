import * as React from 'react';
import { Panel } from '../../elements/Panel';
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

  const data = React.useMemo(
    () => (
      new Array(10000).fill(1).map<Data>((value, index) => ({
        _id        : index,
        title      : `Product ${index}`,
        description: `Some description for product number ${index}`
      }))
    ),
    []
  );

  const handleSelectItem = (item: Data) => {
    setSelectedItem(item);
  };

  return (
    <Panel table>
      <Panel.Header content={'Virtualized Table'} />
      <Panel.Body>
        <AutoSpacer disableWidth>
          {({ height }) => (
            <VirtualizedTable<Data>
              selectable
              data={data}
              getRowKey={'_id'}
              height={height - 28}
              headerHeight={45}
              filterRowHeight={52}
              rowHeight={58}
              overscanCount={150}
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
      </Panel.Body>
    </Panel>
  );
};
