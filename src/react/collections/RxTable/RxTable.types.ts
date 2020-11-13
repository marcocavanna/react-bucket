import * as React from 'react';

import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import { ColumnType as RcColumnType, GetRowKey } from 'rc-table/lib/interface';

import {
  ShorthandItem,
  ReactBucketIcon,
  ShorthandContent
} from '../../generic';

import { TableCellProps, TableHeaderCellProps, TableProps } from '../Table';

import { IconProps } from '../../elements/Icon';


export { GetRowKey };

export interface RxTableProps<Data> extends StrictRxTableProps<Data> {

}


/* --------
 * Main RxTable Interface
 * -------- */
export interface StrictRxTableProps<Data> extends Omit<RcTableProps<Data>, OmittedRcTablePropsField>,
  Omit<TableProps<Data>, OmittedTablePropsFiled> {

  /** RxTable could not have any children */
  children?: never;

  /** Table Columns */
  columns: RxTableColumn<Data>[];

  /** Table Data */
  data?: Data[] | ((timestamp: number, props: RxTableProps<Data>) => Data[]) | ((
    timestamp: number,
    props: RxTableProps<Data>
  ) => Promise<Data[]>);

  /** Force Data Reload will be passed to Effect Hook to reload table data */
  forceDataReload?: any;

  /** Set if Table will Start with Loading State to True */
  initiallyLoading?: boolean;

  /** Callback Handler onChange */
  onChange?: (
    pagination: RxTablePaginationConfig | false | null | undefined,
    filters: Record<string, React.Key[] | null>,
    sorter: SorterResult<Data> | SorterResult<Data>[],
    current: RxTableCurrentData<Data>
  ) => void;

  /** Set Pagination Props */
  pagination?: false | RxTablePaginationConfig;

  /** Set Row Selection */
  rowSelection?: RxTableRowSelection<Data>;

  /** Set Scroll Options */
  scroll?: RcTableProps<Data>['scroll'] & { scrollToFirstRowOnChange?: boolean };

  /** Set the initial Sort Direction */
  sortDirections?: SortOrder;

  /** Props passed to Table Component */
  tableProps?: TableProps;

}

type OmittedTablePropsFiled = 'rows' | 'sortable' | 'tableData';

type OmittedRcTablePropsField =
  'transformColumns'
  | 'internalHooks'
  | 'internalRefs'
  | 'data'
  | 'columns'
  | 'scroll'
  | 'emptyText';


export type RxTableCurrentData<Data> = {
  current: Data[];
};

export type TableAction = 'filter' | 'sort' | 'paginate';


/* --------
 * RxTable Column Interface
 * -------- */
export interface RxTableColumn<Data> extends Omit<RcColumnType<Data>, 'render' | 'onCell' | 'onHeaderCell'> {
  /** Set the Default Filtered Value */
  defaultFilteredValue?: React.Key[] | null;

  /** Set the Default Sort Order */
  defaultSortOrder?: SortOrder;

  /** The Filter DropDown Menu */
  filterDropdown?: ShorthandContent | ((props: FilterDropdownProps) => ShorthandContent);

  /** Set if DropDown Filter menu is Visible */
  filterDropdownVisible?: boolean;

  /** Set if is filtered */
  filtered?: boolean;

  /** Set Filtered Value */
  filteredValue?: React.Key[] | null;

  /** Set the filter icon to show */
  filterIcon?: ReactBucketIcon<IconProps> | ((filtered: boolean) => ReactBucketIcon<IconProps>);

  /** Set Columns Available Filters */
  filters?: ColumnFilterItem[];

  /** Set Custom Props for Each Cell */
  onCell?: (item: Data, index: number) => TableCellProps;

  /** Set Custom Props for Each Header Cell */
  onHeaderCell?: (columns: RxTableColumn<Data>) => TableHeaderCellProps;

  /** Handler on Filter Change */
  onFilter?: (value: string | number | boolean, item: Data) => boolean;

  /** Handler on Filter Dropdown Menu visibility change */
  onFilterDropdownVisibleChange?: (visible: boolean) => void;

  /** Custom Render Function */
  render?: (value: any, item: Data, index: number) => ShorthandContent | { props: ShorthandItem<TableCellProps> };

  /** Define Column Sorter */
  sorter?: boolean | CompareFn<Data>;

  /** Set the Sort Direction */
  sortDirections?: SortOrder[];

  /** Set Column Sort Order */
  sortOrder?: SortOrder;

  /** Set the Column Title */
  title?: RxTableColumnTitle<Data>;
}

export type CompareFn<Data> = (a: Data, b: Data, sortOrder?: SortOrder) => number;

export type SortOrder = 'asc' | 'desc' | null;

export type SorterResult<Data> = {
  column?: RxTableColumn<Data>;
  order?: SortOrder;
  field?: React.Key | null;
  columnKey?: React.Key;
};

export type ColumnFilterItem = { text: ShorthandContent; value: string | number | boolean; children?: ColumnFilterItem[] };

export type FilterDropdownProps = {
  setSelectedKeys: (selectedKes: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: () => void;
  clearFilters?: () => void;
  filters?: ColumnFilterItem[];
  visible: boolean;
};

export type RxTableColumnTitleProps<Data> = {
  sorter?: { column: RxTableColumn<Data>; order: SortOrder },
  filters?: Record<string, string[]>;
};

export type RxTableColumnTitle<Data> = ShorthandContent | ((props: RxTableColumnTitleProps<Data>) => ShorthandContent);

export type RxTableColumns<Data> = RxTableColumn<Data>[];

export type TransformColumns<Data> = (columns: RxTableColumns<Data>) => RxTableColumns<Data>;


/* --------
 * Row Selection Interfaces
 * -------- */
export interface RxTableRowSelection<Data> {
  checkStrictly?: boolean;

  /** Set the Column Width */
  columnWidth?: string | number;

  /** Set the Column Title */
  columnTitle?: ShorthandContent;

  /** Fix Column */
  fixed?: boolean;

  /** Choose if select all button should be hide */
  hideSelectAll?: boolean;

  /** On Selection Change Handler */
  onChange?: (selectedKeys: React.Key[], selectedRows: Data[]) => void;

  /** On Row Select Handler */
  onSelect?: RowSelectCallback<Data>;

  /** Keep selected key, event if item doesn't exists in data anymore */
  preserveSelectedRowKeys?: boolean;

  /** Custom render Function */
  render?: (selected: boolean, item: Data, index: number, original: React.ReactNode) => ShorthandContent;

  /** Set the Selected Row Keys */
  selectedRowKeys?: React.Key[];

  /** Se the Selection Type */
  type?: RowSelectionType;
}

export type RowSelectionType = 'checkbox' | 'radio';

export type RowSelectCallback<Data, E = HTMLElement> = (
  item: Data,
  selected: boolean,
  selectedRows: Data[],
  nativeEvent: React.MouseEvent<E>
) => void;


/* --------
 * Pagination Interfaces
 * -------- */
export type RxTablePaginationPosition =
  'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right';

export interface RxTablePaginationConfig {
  position?: RxTablePaginationPosition;
}


/* --------
 * Event Info Interfaces
 * -------- */
export interface ChangeEventInfo {
  [key: string]: any;
}
