import { VariableSizeListProps } from 'react-window';

import { StrictRxTableProps } from '../../collections/RxTable';


/* --------
 * Extract Useful Props from VariableSizeList
 * -------- */
export type PickedVariableSizeListProps = Pick<VariableSizeListProps, PickerVariableSizeListProps>;

type PickerVariableSizeListProps =
  'direction'
  | 'itemKey'
  | 'overscanCount'
  | 'onItemsRendered'
  | 'onScroll'
  | 'useIsScrolling';


/* --------
 * Main Virtualized Table Interface
 * -------- */
export interface VirtualizedTableProps<Data> extends StrictVirtualizedTableProps<Data> {
  [key: string]: any
}

export interface StrictVirtualizedTableProps<Data> extends StrictRxTableProps<Data>,
  Partial<PickedVariableSizeListProps> {
  /** Filter row height */
  filterRowHeight?: number;

  /** Table header height */
  headerHeight?: number;

  /** Table Height */
  height?: number;

  /** Set the maximum height */
  maximumHeight?: number;

  /** Set the minimum height */
  minimumHeight?: number;

  /** Row height, a fixed number or a get function, received the index */
  rowHeight: number | ((index: number) => number);

  /** Set if must subtract some pixel from height */
  subtractToHeight?: number;
}
