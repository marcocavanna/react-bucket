import * as React from 'react';
import { AnyObject } from '../../generic';
import { VirtualizedTableProps } from './VirtualizedTable.types';
declare const VirtualizedTable: <Data extends AnyObject>(
  props: React.PropsWithChildren<VirtualizedTableProps<Data>>
) => React.FunctionComponentElement<VirtualizedTableProps<Data>>;
export default VirtualizedTable;
