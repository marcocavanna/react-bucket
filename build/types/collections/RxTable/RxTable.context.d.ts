import * as React from 'react';
import { AnyObject } from '../../generic';
import { RxTableFactory } from './RxTable.factory';
import { RxTableColumnProps, RxTableComponents } from './RxTable.types';
export interface RxTableContext<
  Data extends AnyObject,
  ColumnProps extends {} = {}
> extends RxTableFactory<Data> {
  /** All VirtualizedTable Columns */
  columns: RxTableColumnProps<Data, ColumnProps>[];
  /** Components used to render data */
  Components: RxTableComponents<Data>;
  /** Row Key Getter */
  getRowKey: (row: Data, index: number, array: Data[]) => React.Key;
  /** Check if data is currently loading */
  isLoading: boolean;
  /** Check if must enable row click */
  isRowClickEnabled: boolean;
}
declare const RxTableProvider: React.Provider<RxTableContext<any, {}>>,
  RxTableConsumer: React.Consumer<RxTableContext<any, {}>>;
declare function useRxTable<Data>(): RxTableContext<Data>;
export { useRxTable, RxTableProvider, RxTableConsumer };
