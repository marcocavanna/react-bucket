import { AnyObject } from '../../generic';
import { contextBuilder } from '../../lib';

import { EmptyContentProps } from '../../elements/EmptyContent';
import { LoaderProps } from '../../elements/Loader';

import { RxTableFactory } from './RxTable.factory';

import { RxTableColumnProps, RxTableComponents } from './RxTable.types';


/* --------
 * RxTable Context Definition
 * -------- */
export interface RxTableContext<Data extends AnyObject, ColumnProps extends {} = {}> extends RxTableFactory<Data> {
  /** All VirtualizedTable Columns */
  columns: RxTableColumnProps<Data, ColumnProps>[];

  /** Components used to render data */
  Components: RxTableComponents<Data>;

  /** Check if data is currently loading */
  isLoading: boolean;

  /** Check if must enable row click */
  isRowClickEnabled: boolean;

  /** Set default loader props, used with default loader component */
  loaderProps?: Partial<LoaderProps>;

  /** Set default empty content props, used with default empty component */
  noDataEmptyContentProps?: EmptyContentProps;

  /** Set default empty content props, used with default empty component */
  noFilteredDataEmptyContentProps?: EmptyContentProps;
}


/* --------
 * Context Building
 * -------- */
const {
  hook    : defaultUseRxTable,
  Provider: RxTableProvider,
  Consumer: RxTableConsumer
} = contextBuilder<RxTableContext<any>>();

function useRxTable<Data>(): RxTableContext<Data> {
  return defaultUseRxTable();
}

export {
  useRxTable,
  RxTableProvider,
  RxTableConsumer
};
