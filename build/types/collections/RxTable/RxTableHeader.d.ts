import * as React from 'react';
import { RxTableFactory } from './RxTable.factory';
import { RxTableDataFilter } from './RxTable.types';
export interface RxTableFilterElementProps {
  /** The Column Key */
  columnKey: string;
  /** Filter type */
  filter?: RxTableDataFilter<unknown>;
  /** All filters */
  filters: RxTableFactory<any>['filters'];
  /** Set filter function */
  setFilter: RxTableFactory<any>['setFilter'];
}
export declare const RxTableFilterElement: React.FunctionComponent<RxTableFilterElementProps>;
declare const RxTableHeader: React.FunctionComponent;
export { RxTableHeader };
