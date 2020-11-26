import * as React from 'react';

import { VariableSizeListProps } from 'react-window';

import { RxTableColumnProps, RxTableComponents } from '../../collections/RxTable';
import { UseRxTableFactoryConfig } from '../../collections/RxTable/RxTable.factory';
import { EmptyContentProps } from '../../elements/EmptyContent';
import { LoaderProps } from '../../elements/Loader';


export interface VirtualizedTableProps<Data> extends StrictVirtualizedTableProps<Data> {
  [key: string]: any
}

type PickerVariableSizeListProps =
  'direction'
  | 'itemKey'
  | 'overscanCount'
  | 'onItemsRendered'
  | 'onScroll'
  | 'useIsScrolling';

export type PickedVariableSizeList = Pick<VariableSizeListProps, PickerVariableSizeListProps>;


/* --------
 * Main Virtualized Table Interface
 * -------- */
export interface StrictVirtualizedTableProps<Data>
  extends UseRxTableFactoryConfig<Data, MandatoryVirtualizedColumnProps>, Partial<PickedVariableSizeList> {

  /** Component used to render Virtualized Table */
  Components?: Partial<RxTableComponents<Data>>;

  /** Disable Header Render */
  disableHeader?: boolean;

  /** Filter row height */
  filterRowHeight?: number;

  /** Set the column width grid factor, default to `24` */
  gridFactor?: number;

  /** Table header height */
  headerHeight?: number;

  /** Table Height */
  height: number;

  /** Set default loader props, used with default loader component */
  loaderProps?: Partial<LoaderProps>;

  /** Set default empty content props, used with default empty component */
  noDataEmptyContentProps?: EmptyContentProps;

  /** Set default empty content props, used with default empty component */
  noFilteredDataEmptyContentProps?: EmptyContentProps;

  /** Row height, a fixed number or a get function, received the index */
  rowHeight: number | ((index: number) => number);

  /** Wrapper Style */
  style?: React.CSSProperties;

  /** Table Width */
  width: number;

}


/* --------
 * Virtualized Table Columns
 * -------- */
type MandatoryVirtualizedColumnProps = {
  /** The Column Width */
  width: number;

  /** Width calc type */
  widthType?: 'fixed' | 'percentage' | 'grid';
};

export type VirtualizedTableColumnProps<Data> = RxTableColumnProps<Data, MandatoryVirtualizedColumnProps>;
