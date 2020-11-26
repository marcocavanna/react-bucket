import * as React from 'react';
import { VariableSizeListProps } from 'react-window';
import {
  RxTableColumnProps,
  RxTableComponents,
} from '../../collections/RxTable';
import { UseRxTableFactoryConfig } from '../../collections/RxTable/RxTable.factory';
export interface VirtualizedTableProps<Data>
  extends StrictVirtualizedTableProps<Data> {
  [key: string]: any;
}
declare type PickerVariableSizeListProps =
  | 'direction'
  | 'itemKey'
  | 'overscanCount'
  | 'onItemsRendered'
  | 'onScroll'
  | 'useIsScrolling';
export declare type PickedVariableSizeList = Pick<
  VariableSizeListProps,
  PickerVariableSizeListProps
>;
export interface StrictVirtualizedTableProps<Data>
  extends UseRxTableFactoryConfig<Data, MandatoryVirtualizedColumnProps>,
    Partial<PickedVariableSizeList> {
  /** Component used to render Virtualized Table */
  Components?: Partial<RxTableComponents<Data>>;
  /** Disable Header Render */
  disableHeader?: boolean;
  /** Filter row height */
  filterRowHeight?: number;
  /** Table header height */
  headerHeight?: number;
  /** Table Height */
  height: number;
  /** Row height, a fixed number or a get function, received the index */
  rowHeight: number | ((index: number) => number);
  /** Wrapper Style */
  style?: React.CSSProperties;
  /** Table Width */
  width: number;
}
declare type MandatoryVirtualizedColumnProps = {
  /** The Column Width */
  width: number;
};
export declare type VirtualizedTableColumnProps<Data> = RxTableColumnProps<
  Data,
  MandatoryVirtualizedColumnProps
>;
export {};
