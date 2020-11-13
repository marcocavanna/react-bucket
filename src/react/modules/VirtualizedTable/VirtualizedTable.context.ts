import * as React from 'react';

import { contextBuilder } from '../../lib';

import { AnyObject } from '../../generic';
import { VirtualizedTableComponents } from './VirtualizedTable.types';

import { VirtualizedTableColumnProps } from './VirtualizedTableColumn.types';

/* --------
 * Virtualized Table Context Definition
 * -------- */
export interface VirtualizedTableContext<Data extends AnyObject = AnyObject> {
  /** All VirtualizedTable Columns */
  columns: VirtualizedTableColumnProps<Data>[];

  /** Components used to render data */
  Components: VirtualizedTableComponents;

  /** Table data */
  data: Data[];

  /** Effective table width */
  effectiveWidth: number;

  /** Header row height */
  headerHeight: number;

  /** Table total height */
  height: number;

  /** Get the row height using index */
  getRowHeight: (index: number) => number;

  /** Register a new Column */
  registerColumn: (props: VirtualizedTableColumnProps<Data>) => void;

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
