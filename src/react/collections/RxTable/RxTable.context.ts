import { AnyObject } from '../../generic';
import { contextBuilder } from '../../lib';

import { EmptyContentProps } from '../../elements/EmptyContent';
import { LoaderProps } from '../../elements/Loader';

import { RxTableFactory } from './RxTable.factory';

import { RxTableComponents } from './RxTable.types';


/* --------
 * RxTable Context Definition
 * -------- */
export interface RxTableContext<Data extends AnyObject> extends RxTableFactory<Data> {
  /** Components used to render data */
  Components: RxTableComponents<Data>;

  /** Set default loader props, used with default loader component */
  loaderProps?: Partial<LoaderProps>;

  /** Set default empty content props, used with default empty component */
  noDataEmptyContentProps?: Partial<EmptyContentProps>;

  /** Set default empty content props, used with default empty component */
  noFilteredDataEmptyContentProps?: Partial<EmptyContentProps>;
}


/* --------
 * Context Building
 * -------- */
const {
  hook    : defaultUseRxTable,
  Provider: RxTableProvider,
  Consumer: RxTableConsumer
} = contextBuilder<RxTableContext<any>>(undefined, 'RxTable');

function useRxTable<Data>(): RxTableContext<Data> {
  return defaultUseRxTable();
}

export {
  useRxTable,
  RxTableProvider,
  RxTableConsumer
};
