import * as React from 'react';

import { AnyObject, ContentAlign, ShorthandItem } from '../../generic';

import { SelectProps } from '../../elements/Select';
import { CheckboxProps } from '../../elements/Checkbox';
import { InputProps } from '../../elements/Input';

import { TableCellContentProps } from '../../collections/Table';


export interface VirtualizedTableColumnProps<Data extends AnyObject = AnyObject>
  extends StrictVirtualizedTableColumnProps<Data> {
  [key: string]: any;
}

type ComputedField<Data> = (data: Data, index: number, array: Data[]) => ShorthandItem<TableCellContentProps>;

export type VirtualizedColumnInputFilter<Data> = {
  initialValue?: string,
  type: 'input',
  props?: InputProps,
  show: (value: string, data: Data, index: number, array: Data[]) => boolean;
};

export type VirtualizedColumnCheckboxFilter<Data> = {
  initialValue?: boolean,
  type: 'checkbox',
  props?: CheckboxProps,
  show: (value: boolean, data: Data, index: number, array: Data[]) => boolean;
};

export type VirtualizedColumnSelectFilter<Data> = {
  initialValue?: string,
  type: 'select',
  props?: SelectProps,
  show: (value: string, data: Data, index: number, array: Data[]) => boolean;
};

type DataFilter<Data> =
  VirtualizedColumnInputFilter<Data>
  | VirtualizedColumnCheckboxFilter<Data>
  | VirtualizedColumnSelectFilter<Data>;

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

  /** Filter data */
  filter?: DataFilter<Data>

  /** Header content */
  header?: React.ReactNode;

  /** Column Key */
  key: string;

  /** Inner content render */
  render?: (data: Data, index: number, array: Data[]) => React.ReactNode;

  /** Change Column Sorting */
  sort?: string[];

  /** Set text align */
  textAlign?: ContentAlign;

  /** Column Width */
  width: number;
}
