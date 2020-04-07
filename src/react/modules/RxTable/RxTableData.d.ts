import React from 'react';
import { FuseOptions } from 'fuse.js';

import { StrictTableHeaderCellProps } from '../../collections/Table/TableHeaderCell';

export interface IRxTableDataColumn<T> extends StrictTableHeaderCellProps {

  /**
   * Set the Cell Content for this column
   * cellContent key must be a `function` that
   * will be executed passing item, column props
   * and entire table data as params
   */
  cellContent?: (item: T, props: IRxTableDataColumn, data: T[]) => React.ReactNode

  /**
   * Setting a column ID is usefull
   * when sort is setted up. The id
   * will be used to set the initial
   * sort column.
   */
  id?: string | keyof T

  /**
   * If a column che be sorted, set this
   * property to a string key that will
   * be used to sort the Array. Sort Key
   * can be a nested object property too.
   * If you want to define multiple sort, then
   * set this property to an Array of string
   */
  sort?: keyof T | (keyof T)[]

}

export interface IRxTableDataSortingOptions<T> {

  /**
   * Set if Table is Sortable
   * This option will be automatically setted
   * to true if valid initialSort param will be provided
   */
  enabled: boolean

  /**
   * Set the initial table sort.
   * The initial sort must be
   * indicated using the column id
   * that will be used to get sort options.
   *
   * To reverse the Sort (in desc mode), prepend
   * the `-` (minus) char before the column id
   *
   * `initialSort: 'name'` will sort by name ASC
   * `initialSort: '-name'` will sort by name DESC
   */
  initial: keyof T

}

export interface IRxTableDataFilteringOptions<T> {

  /**
   * Set if Filtering is case sensitive/insensitive
   *
   * Default `false`
   */
  caseSensitive: boolean

  /**
   * Set wich field will be used
   * while filtering data.
   * This options will always fallback to
   * an array of fields, but can be passed
   * as a Function that will return an array
   * of fields that will be used to filter data
   *
   * Default `[]`
   */
  fields: (keyof T)[] // string | string[] | Function

  /**
   * Set if filtering behaviour
   * is fuzzy search. Enabling
   * this option will override
   * the `useRegExp` prerence
   *
   * Default `false`
   */
  fuzzyBehaviour: boolean

  /**
   * Set if RegExp are allowed
   * in filtering options.
   * This options could not be used
   * while `fuzzyBehaviour` ir active
   *
   * Default `false`
   */
  useRegExp: boolean

}

export interface IRxTableDataOptions<T> {

  /** Set Table Columns */
  columns: IRxTableDataColumn<T>[]

  /**
   * Set the Preferences for
   * filtering data
   */
  filtering?: IRxTableDataFilteringOptions<T>

  /**
   * Set the name of the Field
   * that will be used as key
   * property for React iteration
   *
   * Default `_key`
   */
  keyField?: string

  /** On Row Click function handler */
  onRowClick?: (item: {}, index: number, data: {}[]) => void

  /** Set row tools */
  rowTools?: {
    /**
     * The `show` property is used to check if
     * tools trigger button must be rendered or not.
     * If this option will be setted to a function, then
     * it will be called passing current table row
     */
    show: ((row: object) => boolean) | boolean

    /**
     * Row Tools is an array of react component that will be
     * appended to popup menu
     */
    tools: ((row: object) => React.ReactNode[]) | React.ReactNode[]
  }

  /** Set Preferences for Table Sorting */
  sorting?: IRxTableDataSortingOptions<T>
}

export interface IRxTableDataSorting {
  /**
   * Get the Column ID
   * that will be used to
   * sort data
   */
  by: string

  /**
   * Get if Sorting is
   * Enabled or not
   */
  enabled: boolean

  /**
   * Get if sort
   * must be reversed
   */
  reverse: boolean
}

export interface IRxTableDataFiltering extends IRxTableDataFilteringOptions {
  /**
   * The Searched String
   * used to filter data
   */
  search: string
}

declare class RxTableData<T> {

  /**
   * Get the default settings
   * for filtering data
   */
  static defaultFiltering: IRxTableDataFiltering

  /**
   * Get the default settings
   * for Sorting data
   */
  static defaultSorting: IRxTableDataSorting

  /**
   * Get the default FuseJS options
   * that will be used to initialize the
   * Fuzzy Search Behaviour
   */
  static fuseJSOptions: FuseOptions<any>

  /**
   * Build a new RxTable Object
   * using an Array of Data that will
   * be used to return data
   */
  constructor(data: T[], options: IRxTableDataOptions<T>)

  /**
   * Build a new RxTable Object
   * using a function to retreive
   * data that will be used
   */
  constructor(data: () => T[], options: IRxTableDataOptions<T>)

  /**
   * Build a new RxTable Object
   * using a function that
   * return a Promise to retreive
   * data that will be used
   */
  constructor(data: () => Promise<T[]>, options: IRxTableDataOptions<T>)


  /**
   * Change the string that will
   * be used to filter data
   */
  filter(str: string): this


  /** Check if a certain row has tools to show */
  hasTools(...args): boolean


  /**
   * Create a Listener that will fire
   * every once the data has been loaded
   * This Listener will fire only if
   * data are passed as async function
   */
  onDataLoaded(callback: (err: any | Error, data: T[]) => void, context: any): () => void


  /**
   * Create a new Listener that will
   * fire every once the Data will be
   * loading.
   * This Listener will fire only if
   * data are passed as async function.
   */
  onDataLoading(callback: () => void, context: any): () => void


  /**
   * Reload Table Data
   * Setting the silent to true to avoid
   * onDataLoading event fire if data load
   * is an async function.
   * Default to true
   */
  reload(options?: { silent: boolean }): void


  /**
   * Change the Actual Sort for data
   * if no param will be passed to function
   * the sorting is temporary disabled
   * if the column choosen to sort data
   * is the same of actual sorting column
   * this function will revert the sort.
   * Calling this function will fire
   * the `onSortChanged` event
   */
  sort(column: string): this


  /** Get Tools */
  tools(...args): boolean

  /** Get Columns Array */
  columns: IRxTableDataColumn<T>[]

  /** Return counter for data */
  count: { all: number, filtered: number }

  /** Array data filtered and sorted */
  data: T[]

  /** Return the Hash for the current data */
  dataHash: string

  /**
   * Get actual filtering options
   * for this set of data
   */
  filtering: IRxTableDataFiltering

  /**
   * Check if current data has length = 0
   * to get this value it will be checked
   * filtered data length and not the all data length
   */
  isEmpty: boolean

  /** Get the Key Field */
  keyField: string

  /** Boolean that indicate if data has been loaded */
  loaded: boolean

  /** Boolean that indicate if data is currently loading */
  loading: boolean

  /** Fire the onRowClick functions */
  onRowClick(): void

  /** Return the Hash for the current options */
  optionsHash: string

  /** Get the reloading state */
  reloading: boolean

  /**
   * Get the actual sorting options
   * for this set of data
   */
  sorting: IRxTableDataSorting

  /** Check if table has tools column */
  tableHasTools: boolean

  /** Get Tools */
  tools: () => React.ReactNode[]

}

export default RxTableData;
