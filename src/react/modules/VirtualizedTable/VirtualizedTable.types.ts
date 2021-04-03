import { VariableSizeListProps } from 'react-window';

import { StrictRxTableProps } from '../../collections/RxTable';
import { ButtonProps } from '../../elements/Button';


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

  /** Extra props used for ScrollOnTob Button */
  scrollOnTopButtonProps?: Partial<ButtonProps>;

  /** Set the scroll offset after that ScrollOnTop component will be visible, default is 2 x TableBodyHeight */
  scrollOnTopOffsetVisibility?: number;

  /** Set if must subtract some pixel from height */
  subtractToHeight?: number;

  /** Use the ScrollOnTop Button */
  useScrollOnTop?: boolean;
}
