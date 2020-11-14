import * as React from 'react';

import { contextBuilder } from '../../lib';

import { AnyObject } from '../../generic';
import { VirtualizedTableComponents } from './VirtualizedTable.types';

import { VirtualizedTableColumnProps } from './VirtualizedTableColumn.types';

/* --------
 * Virtualized Table Context Definition
 * -------- */
export interface VirtualizedTableContext<Data extends AnyObject = AnyObject> {
  /** Change filters */
  changeFilters: (columnKey: string, value: any) => void;

  /** All VirtualizedTable Columns */
  columns: VirtualizedTableColumnProps<Data>[];

  /** Components used to render data */
  Components: VirtualizedTableComponents;

  /** Table data */
  data: Data[];

  /** Effective table width */
  effectiveWidth: number;

  /** Height of filter row */
  filterRowHeight: number;

  /** Actual table filters */
  filters: Record<string, any>;

  /** Check if table has filters */
  hasFilterRow: boolean;

  /** Header row height */
  headerHeight: number;

  /** Table total height */
  height: number;

  /** Check if must enable row click */
  isRowClickEnabled: boolean;

  /** Check if sorting is reversed */
  isSortReversed: boolean;

  /** Get the row height using index */
  getRowHeight: (index: number) => number;

  /** Register a new Column */
  registerColumn: (props: VirtualizedTableColumnProps<Data>) => void;

  /** Row Click Handler */
  rowClick: (index: number) => void;

  /** Change Sorting */
  sort: (fields: string[], reverse: boolean) => void;

  /** Current sorting */
  sorting: string[];

  /** Table total width */
  width: number;

  /** Unregister a column */
  unregisterColumn: (key: React.Key) => void;
}


const {
  hook    : useVirtualizedTable,
  Provider: VirtualizedTableProvider,
  Consumer: VirtualizedTableConsumer
} = contextBuilder<VirtualizedTableContext<any>>();

export {
  useVirtualizedTable,
  VirtualizedTableProvider,
  VirtualizedTableConsumer
};
