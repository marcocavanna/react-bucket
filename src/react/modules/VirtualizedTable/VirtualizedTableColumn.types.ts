import * as React from 'react';

import { AnyObject, ContentAlign, ShorthandItem } from '../../generic';

import { TableCellContentProps } from '../../collections/Table';


export interface VirtualizedTableColumnProps<Data extends AnyObject = AnyObject>
  extends StrictVirtualizedTableColumnProps<Data> {
  [key: string]: any;
}

type ComputedField<Data> = (data: Data, index: number, array: Data[]) => ShorthandItem<TableCellContentProps>;

export interface StrictVirtualizedTableColumnProps<Data> {
  /** Column Cell definition by object */
  cell?: {
    /** Main Content */
    content?: ComputedField<Data> | React.ReactNode | TableCellContentProps;
    /** Cell Header */
    header?: ComputedField<Data> | React.ReactNode | TableCellContentProps;
    /** Meta Content */
    meta?: ComputedField<Data> | React.ReactNode | TableCellContentProps;
  };

  /** Children are not allowed */
  children?: never;

  /** User defined classes */
  className?: string;

  /** Header content */
  header?: React.ReactNode;

  /** Column Key */
  key: React.Key;

  /** Inner content render */
  render?: (data: Data, index: number, array: Data[]) => React.ReactNode;

  /** Change Column Sorting */
  sort?: string[];

  /** Set text align */
  textAlign?: ContentAlign;

  /** Column Width */
  width: number;
}
