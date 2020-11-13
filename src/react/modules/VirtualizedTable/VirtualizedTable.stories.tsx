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
    <AutoSpacer>
      {({ width, height }) => (
        <VirtualizedTable
          data={data}
          height={height}
          headerHeight={40}
          rowHeight={58}
          width={width}
          columns={[
            {
              width,
              key   : 'title',
              header: 'Titolo',
              cell  : {
                header : (item) => item.title,
                content: (item) => item.description
              }
            }
          ]}
        />
      )}
    </AutoSpacer>
  );
};
