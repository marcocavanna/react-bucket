import * as React from 'react';

import { AnyObject } from '../../generic';

import { contextBuilder } from '../../lib';
import { RxTableFactory } from './RxTable.factory';

import { RxTableColumnProps, RxTableComponents } from './RxTable.types';


/* --------
 * RxTable Context Definition
 * -------- */
export interface RxTableContext<Data extends AnyObject, ColumnProps extends {} = {}> extends RxTableFactory<Data> {
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


/* --------
 * Context Building
 * -------- */
const {
  hook    : defaultUseRxTable,
  Provider: RxTableProvider,
  Consumer: RxTableConsumer
} = contextBuilder<RxTableContext<any>>();

function useRxTable<Data>(): RxTableContext<Data> {
  return defaultUseRxTable();
}

export {
  useRxTable,
  RxTableProvider,
  RxTableConsumer
};
