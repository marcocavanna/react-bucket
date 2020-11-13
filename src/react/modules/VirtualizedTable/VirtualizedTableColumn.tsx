import * as React from 'react';

import { VirtualizedTableColumnProps } from './VirtualizedTableColumn.types';

import { useVirtualizedTable } from './VirtualizedTable.context';


/* --------
 * Component Declaration
 * -------- */
type VirtualizedTableColumnComponent = React.FunctionComponent<VirtualizedTableColumnProps>;


/* --------
 * Component Render
 * -------- */
const VirtualizedTableColumn: VirtualizedTableColumnComponent = (
  props
) => {
  const virtualizedTable = useVirtualizedTable();

  React.useEffect(
    () => {
      /** Register the Column */
      virtualizedTable.registerColumn(props);

      /** Remove the Column on component unmount */
      return () => {
        virtualizedTable.unregisterColumn(props.key);
      };
    },
    // eslint-disable-next-line
    [
      props.key,
      virtualizedTable,
      virtualizedTable.registerColumn,
      virtualizedTable.unregisterColumn
    ]
  );

  return null;
};

VirtualizedTableColumn.displayName = 'VirtualizedTableColumn';

export default VirtualizedTableColumn;
