import * as React from 'react';
import { RxTableCellComponent, RxTableColumnProps } from './RxTable.types';
interface RxTableBodyCellProps<Data> {
  className?: string;
  column: RxTableColumnProps<Data>;
  Component: RxTableCellComponent<Data>;
  tableData: Data[];
  index: number;
  row: Data;
}
export declare const RxTableBodyCell: React.FunctionComponent<RxTableBodyCellProps<
  unknown
>>;
declare const RxTableBody: React.FunctionComponent;
export { RxTableBody };
