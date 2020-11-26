import { AnyObject } from '../../generic';
import { RxTableColumnProps } from './RxTable.types';
export interface UseRxTableFactoryConfig<Data, ColumnProps extends {} = {}> {
  /** Table Columns definition */
  columns: RxTableColumnProps<Data, ColumnProps>[];
  /** Table Data */
  data: Data[] | ((timestamp: number) => Data[] | Promise<Data[]>);
  /** Set default data to show while factory is loading */
  defaultData?: Data[];
  /** Set the default loading state */
  defaultLoading?: boolean;
  /** Set initial reverse sorting */
  defaultReverseSorting?: boolean;
  /** Set initial sort */
  defaultSort?: string[];
  /**
   * Set the filter logic. With and type, all filter must return
   * true to show item, with or at least one must be valid
   */
  filterLogic?: 'and' | 'or';
  /** On Row Click Handler */
  onRowClick?: (row: Data, index: number, array: Data[]) => void;
  /** Callback handler fired when sort is changing */
  onSortChange?: (sorting: string[], reverse: boolean) => void;
  /** Dependencies passed to data load hook. Set this to manually control data reload */
  reloadDependency?: any;
  /** Disable Loader on data reload */
  reloadSilently?: boolean;
  /** Manual control reverse sorting */
  reverseSorting?: boolean;
  /** Manual control sorting */
  sort?: string[];
}
export interface RxTableFactory<Data> {
  /** Data */
  data: Data[];
  /** Data load error */
  error: any;
  /** Current Filters */
  filters: Record<string, any>;
  /** Row Click Handler */
  handleRowClick: (index: number) => void;
  /** Return if Table could show filter row */
  hasFilterRow: boolean;
  /** Return if Table could show header row */
  hasHeaderRow: boolean;
  /** Data is Currently Loading */
  isLoading: boolean;
  /** Check if row click is enabled */
  isRowClickEnabled: boolean;
  /** Checker for reversed sorting */
  isSortReversed: boolean;
  /** Change column filter */
  setFilter: (column: string, value: any) => void;
  /** Change data sorting */
  setSorting: (fields: string[], reverse: boolean) => void;
  /** Current Sorting */
  sorting: string[];
  /** Filtered and Sorted Data */
  tableData: Data[];
}
export declare function useRxTableFactory<Data extends AnyObject = any>(
  config: UseRxTableFactoryConfig<Data>
): RxTableFactory<Data>;
