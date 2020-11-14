import * as React from 'react';
import { VariableSizeListProps } from 'react-window';

import { AnyObject } from '../../generic';

import { VirtualizedTableColumnProps } from './VirtualizedTableColumn.types';


export interface VirtualizedTableProps<Data extends AnyObject = AnyObject> extends VirtualizedTableStrictProps<Data> {
  [key: string]: any
}

type PickerVariableSizeListProps =
  'direction'
  | 'itemKey'
  | 'overscanCount'
  | 'onItemsRendered'
  | 'onScroll'
  | 'useIsScrolling';

export type VirtualizedTableComponents = {
  /** Element used to Wrap the rows collection */
  Body: React.ElementType,
  /** Element used to render the single cell */
  BodyCell: React.ElementType,
  /** Element used to render the row */
  BodyRow: React.ElementType,
  /** Element used to wrap the entire list */
  BodyWrapper: React.ElementType,
  /** Element used to Wrap the header rows collection */
  Header: React.ElementType,
  /** Element used to render the single header cell */
  HeaderCell: React.ElementType,
  /** Element used to render the header row */
  HeaderRow: React.ElementType,
  /** Element used to wrap the entire header elements */
  HeaderWrapper: React.ElementType
};

export interface VirtualizedTableStrictProps<Data>
  extends Partial<Pick<VariableSizeListProps, PickerVariableSizeListProps>> {
  /** Columns array */
  columns?: VirtualizedTableColumnProps<Data>[];

  /** Component used to render Virtualized Table */
  Components?: Partial<VirtualizedTableComponents>,

  /** Table Data */
  data: Data[];

  /** Set initial reverse sorting */
  defaultReverseSorting?: boolean;

  /** Set initial sort */
  defaultSort?: string[];

  /** Disable Header Render */
  disableHeader?: boolean;

  /** Table header height */
  headerHeight?: number;

  /** Table Height */
  height: number;

  /** On Row Click Handler */
  onRowClick?: (row: Data, index: number, array: Data[]) => void;

  /** Callback handler fired when sort is changing */
  onSortChange?: (sorting: string[], reverse: boolean) => void;

  /** Manual control reverse sorting */
  reverseSorting?: boolean;

  /** Row height, a fixed number or a get function, received the index */
  rowHeight: number | ((index: number) => number);

  /** Manual control sorting */
  sort?: string[];

  /** Wrapper Style */
  style?: React.CSSProperties

  /** Table Width */
  width: number;
}
