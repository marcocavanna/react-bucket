import * as React from 'react';
import invariant from 'tiny-invariant';

import { AnyObject } from '../../generic';
import { VirtualizedTableComponents } from './VirtualizedTable.types';

import { VirtualizedTableColumnProps } from './VirtualizedTableColumn.types';

/* --------
 * Virtualized Table Context Definition
 * -------- */
export interface VirtualizedTableContext<Data extends AnyObject = AnyObject> {
  /** All VirtualizedTable Columns */
  columns: VirtualizedTableColumnProps<Data>[];

  /** Components used to render data */
  Components: VirtualizedTableComponents;

  /** Table data */
  data: Data[];

  /** Effective table width */
  effectiveWidth: number;

  /** Header row height */
  headerHeight: number;

  /** Table total height */
  height: number;

  /** Get the row height using index */
  getRowHeight: (index: number) => number;

  /** Register a new Column */
  registerColumn: (props: VirtualizedTableColumnProps<Data>) => void;

  /** Table total width */
  width: number;

  /** Unregister a column */
  unregisterColumn: (key: React.Key) => void;
}


/* --------
 * Create the Function to build the VirtualizedTable Context
 * -------- */
function createVirtualizedTableContext() {
  /** Create the Context */
  const virtualizedTableContext = React.createContext<VirtualizedTableContext<any> | undefined>(undefined);

  /** Create the hook function */
  function useVirtualizedTableHook<Data extends AnyObject = AnyObject>(): VirtualizedTableContext<Data> {
    /** Get the value of the context */
    const ctx = React.useContext(virtualizedTableContext);
    /** Assert value exists */
    invariant(
      ctx !== undefined,
      'useVirtualizedTable hook must be invoked insite the Modal Context'
    );
    /** Return the Context */
    return ctx as unknown as VirtualizedTableContext<Data>;
  }

  /** Return the built context */
  return [
    useVirtualizedTableHook,
    virtualizedTableContext.Provider,
    virtualizedTableContext.Consumer
  ] as const;
}

export const [
  useVirtualizedTable,
  VirtualizedTableProvider,
  VirtualizedTableConsumer
] = createVirtualizedTableContext();
