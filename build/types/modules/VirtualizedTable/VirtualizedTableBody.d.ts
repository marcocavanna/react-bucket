import * as React from 'react';
import { PickedVariableSizeList } from './VirtualizedTable.types';
interface VirtualizedTableBodyProps extends PickedVariableSizeList {
  estimatedItemSize?: number;
}
declare const VirtualizedTableBody: React.FunctionComponent<VirtualizedTableBodyProps>;
export { VirtualizedTableBody };
