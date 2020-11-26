import { AnyObject } from '../../generic';
import { contextBuilder } from '../../lib';

import { RxTableComponents } from '../../collections/RxTable';
import { RxTableFactory } from '../../collections/RxTable/RxTable.factory';

import { EmptyContentProps } from '../../elements/EmptyContent';
import { LoaderProps } from '../../elements/Loader';

import { VirtualizedTableColumnProps } from './VirtualizedTable.types';


/* --------
 * Virtualized Table Context Definition
 * -------- */
export interface VirtualizedTableContext<Data extends AnyObject> extends RxTableFactory<Data> {
  /** All VirtualizedTable Columns */
  columns: VirtualizedTableColumnProps<Data>[];

  /** Components used to render data */
  Components: RxTableComponents<Data>;

  /** Effective table width */
  effectiveWidth: number;

  /** Height of filter row */
  filterRowHeight: number;

  /** Get a Column Width */
  getColumnWidth: (key: string) => number;

  /** Get the row height using index */
  getRowHeight: (index: number) => number;

  /** Header row height */
  headerHeight: number;

  /** Table total height */
  height: number;

  /** Check if must enable row click */
  isRowClickEnabled: boolean;

  /** Set default loader props, used with default loader component */
  loaderProps?: Partial<LoaderProps>;

  /** Set default empty content props, used with default empty component */
  noDataEmptyContentProps?: EmptyContentProps;

  /** Set default empty content props, used with default empty component */
  noFilteredDataEmptyContentProps?: EmptyContentProps;

  /** Table total width */
  width: number;
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
