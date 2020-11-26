/// <reference types="react" />
import { RxTableComponents } from '../../collections/RxTable';
import { RxTableFactory } from '../../collections/RxTable/RxTable.factory';
import { AnyObject } from '../../generic';
import { VirtualizedTableColumnProps } from './VirtualizedTable.types';
export interface VirtualizedTableContext<Data extends AnyObject>
  extends RxTableFactory<Data> {
  /** All VirtualizedTable Columns */
  columns: VirtualizedTableColumnProps<Data>[];
  /** Components used to render data */
  Components: RxTableComponents<Data>;
  /** Effective table width */
  effectiveWidth: number;
  /** Height of filter row */
  filterRowHeight: number;
  /** Header row height */
  headerHeight: number;
  /** Table total height */
  height: number;
  /** Check if must enable row click */
  isRowClickEnabled: boolean;
  /** Get the row height using index */
  getRowHeight: (index: number) => number;
  /** Table total width */
  width: number;
}
declare const useVirtualizedTable: () => VirtualizedTableContext<any>,
  VirtualizedTableProvider: import('react').Provider<VirtualizedTableContext<
    any
  >>,
  VirtualizedTableConsumer: import('react').Consumer<VirtualizedTableContext<
    any
  >>;
export {
  useVirtualizedTable,
  VirtualizedTableProvider,
  VirtualizedTableConsumer,
};
