import * as React from 'react';
import { AnyObject } from '../../generic';
import { RxTableProps } from './RxTable.types';
declare const RxTable: <Data extends AnyObject>(
  props: React.PropsWithChildren<RxTableProps<Data>>
) => React.FunctionComponentElement<RxTableProps<Data>>;
export default RxTable;
