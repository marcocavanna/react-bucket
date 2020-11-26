import * as React from 'react';

import {
  ContentAlign,
  ShorthandItem,
  ReactBucketComponentProps,
  AnyObject
} from '../../generic';

import { LoaderProps } from '../../elements/Loader';
import { EmptyContentProps } from '../../elements/EmptyContent';
import { CheckboxProps } from '../../elements/Checkbox';
import { InputProps } from '../../elements/Input';
import { SelectProps } from '../../elements/Select';

import { TableCellContentProps, TableHeaderCellProps } from '../Table';

import { UseRxTableFactoryConfig } from './RxTable.factory';


/* --------
 * RxTable Component
 * -------- */
export interface RxTableProps<Data> extends ReactBucketComponentProps<StrictRxTableProps<Data>, 'table'> {
}

export interface StrictRxTableProps<Data> extends UseRxTableFactoryConfig<Data> {
  /** An Element used to Render the Component */
  as?: string | React.ComponentClass | React.FunctionComponent;

  /** Children ar not permitted */
  children?: never;

  /** Components used to render the Table */
  Components?: Partial<RxTableComponents<Data>>;

  /** Disable Header Render */
  disableHeader?: boolean;

  /** Initial Loading State */
  initiallyLoading?: boolean;

  /** Set default loader props, used with default loader component */
  loaderProps?: Partial<LoaderProps>;

  /** Set default empty content props, used with default empty component */
  noDataEmptyContentProps?: EmptyContentProps;

  /** Set default empty content props, used with default empty component */
  noFilteredDataEmptyContentProps?: EmptyContentProps;

  /** On Row Click Handler */
  onRowClick?: (row: Data, index: number, array: Data[]) => void;

  /** The row key or a function to get it */
  rowKey: keyof Data | ((row: Data, index: number, array: Data[]) => React.Key);

  /** Wrapper Style */
  style?: React.CSSProperties
}


/* --------
 * RxTable Columns
 * -------- */

/** Data Filtering */
export type RxColumnInputFilter<Data> = {
  initialValue?: string,
  type: 'input',
  props?: InputProps,
  show: (value: string, data: Data, index: number, array: Data[]) => boolean;
};

export type RxColumnCheckboxFilter<Data> = {
  initialValue?: boolean,
  type: 'checkbox',
  props?: CheckboxProps,
  show: (value: boolean, data: Data, index: number, array: Data[]) => boolean;
};

export type RxColumnSelectFilter<Data> = {
  initialValue?: string,
  type: 'select',
  props?: SelectProps,
  show: (value: string, data: Data, index: number, array: Data[]) => boolean;
};

export type RxTableDataFilter<Data> =
  | RxColumnInputFilter<Data>
  | RxColumnCheckboxFilter<Data>
  | RxColumnSelectFilter<Data>;


/** Cell content could be computed using function or shorthand */
type ComputedCellContentField<Data> =
  | ((data: Data, index: number, array: Data[]) => ShorthandItem<TableCellContentProps>)
  | TableCellContentProps
  | React.ReactNode;

/** Single Column */
export type RxTableColumnProps<Data, Props extends {} = {}> = Props & StrictRxTableColumnProps<Data>;

export interface StrictRxTableColumnProps<Data> {
  /** Column Cell definition by object */
  cell?: {
    /** Main Content */
    content?: ComputedCellContentField<Data>;
    /** Cell Header */
    header?: ComputedCellContentField<Data>;
    /** Meta Content */
    meta?: ComputedCellContentField<Data>;
  };

  /** Children are not allowed */
  children?: never;

  /** User defined classes */
  className?: string;

  /** Filter data */
  filter?: RxTableDataFilter<Data>

  /** Header content */
  header?: ShorthandItem<TableHeaderCellProps>;

  /** Class name added to header cell only */
  headerClassName?: string;

  /** Column Key */
  key: string;

  /** Inner content render */
  render?: (data: Data, index: number, array: Data[]) => React.ReactNode;

  /** Change Column Sorting */
  sort?: string[];

  /** Set text align */
  textAlign?: ContentAlign;
}


/* --------
 * Side Components
 * -------- */
export interface RxTableHeaderCellProps {
  /** Header cell className */
  className: string;

  /** Header Content */
  content: ShorthandItem<TableHeaderCellProps>;

  /** Rendered Column */
  column: RxTableColumnProps<any, { width?: number }>;

  /** Cell has Sorting */
  hasSorting: boolean;

  /** Column is actual sorted column */
  isActualSortingColumn: boolean;

  /** Column is sorting reversed */
  isReversedSorting: boolean;

  /** On Click Handler */
  onClick?: () => void;
}

export interface RxTableFilterCellProps {
  /** Filter element is passed using children */
  children: React.ReactNode;

  /** Filter cell className */
  className: string;

  /** Rendered Column */
  column: RxTableColumnProps<any, { width?: number }>;
}

export interface RxTableErrorProps {
  /** The error threw */
  error: any;
}

export interface RxTableNoContentProps {
  /** The filters Element */
  filters: Record<string, any>;
}

export interface RxTableRowProps<Data> {
  /** Columns Array */
  children: React.ReactNode;

  /** Row className */
  className: string;

  /** Columns Array */
  columns: RxTableColumnProps<Data, { width?: number }>[]

  /** Row index */
  index: Number;

  /** On row click handler */
  onClick?: () => void;

  /** The Row Data */
  row: Data;

  /** Optional Style */
  style?: React.CSSProperties;
}

export interface RxTableCellProps<Data> {
  /** Cell className */
  className: string;

  /** Column Properties */
  column: RxTableColumnProps<Data, { width?: number }>;

  /** All data array */
  tableData: Data[];

  /** The Row Index */
  index: number;

  /** Single Row Data */
  row: Data;
}

export type RxTableHeaderCellComponent = React.ComponentType<RxTableHeaderCellProps & AnyObject>;

export type RxTableFilterCellComponent = React.ComponentType<RxTableFilterCellProps & AnyObject>;

export type RxTableErrorComponent = React.ComponentType<RxTableErrorProps & AnyObject>;

export type RxTableRowComponent<Data> = React.ComponentType<RxTableRowProps<Data> & AnyObject>;

export type RxTableCellComponent<Data> = React.ComponentType<RxTableCellProps<Data> & AnyObject>;


/* --------
 * Dynamic Definition of RxTable Components
 * -------- */
export interface RxTableComponents<Data> {
  /** Element used to Wrap the rows collection */
  Body: React.ElementType;

  /** Element used to render the single cell */
  BodyCell: RxTableCellComponent<Data>;

  /** Element used to render the row */
  BodyRow: RxTableRowComponent<Data>;

  /** Element used to wrap the entire list */
  BodyWrapper: React.ElementType;

  /** Error Component */
  Error: RxTableErrorComponent;

  /** The Error Row Wrapper */
  ErrorRow: React.ElementType;

  /** The Error Cell */
  ErrorCell: React.ElementType;

  /** Cell Element used to wrap single Filter */
  FilterCell: RxTableFilterCellComponent;

  /** Row Used to draw Filters */
  FilterRow: React.ElementType;

  /** Element used to Wrap the header rows collection */
  Header: React.ElementType;

  /** Element used to render the single header cell */
  HeaderCell: RxTableHeaderCellComponent;

  /** Element used to render the header row */
  HeaderRow: React.ElementType;

  /** Element used to wrap the entire header elements */
  HeaderWrapper: React.ElementType;

  /** The Loader Element */
  Loader: React.ComponentType;

  /** The Loader Row Wrapper */
  LoaderRow: React.ElementType;

  /** The Loader Row Cell */
  LoaderCell: React.ElementType;

  /** The No Content Element */
  NoContent: React.ComponentType<RxTableNoContentProps>;

  /** The No Content Cell */
  NoContentCell: React.ElementType;

  /** The No Content Row */
  NoContentRow: React.ElementType;
}
