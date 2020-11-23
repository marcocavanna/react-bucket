import * as React from 'react';

import { AnyObject } from '../../generic';

import { contextBuilder } from '../../lib';

import { RxTableColumnProps, RxTableComponents } from './RxTable.types';


/* --------
 * RxTable Context Definition
 * -------- */
export interface RxTableContext<Data extends AnyObject> {
  /** Length of all unfiltered data */
  allDataLength: number;

  /** Change filters */
  changeFilters: (columnKey: string, value: any) => void;

  /** All VirtualizedTable Columns */
  columns: RxTableColumnProps<Data>[];

  /** Components used to render data */
  Components: RxTableComponents<Data>;

  /** Table data */
  data: Data[];

  /** Error object */
  error: any;

  /** Length of filtered data only */
  filteredDataLength: number;

  /** Actual table filters */
  filters: Record<string, any>;

  /** Row Key Getter */
  getRowKey: (row: Data, index: number, array: Data[]) => React.Key;

  /** Check if table has filters */
  hasFilterRow: boolean;

  /** Check if table has header row */
  hasHeaderRow: boolean;

  /** Check if data is currently loading */
  isLoading: boolean;

  /** Check if must enable row click */
  isRowClickEnabled: boolean;

  /** Check if sorting is reversed */
  isSortReversed: boolean;

  /** Row Click Handler */
  rowClick: (index: number) => void;

  /** Change Sorting */
  sort: (fields: string[], reverse: boolean) => void;

  /** Current sorting */
  sorting: string[];
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
