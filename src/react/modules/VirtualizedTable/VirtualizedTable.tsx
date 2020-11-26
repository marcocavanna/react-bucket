import * as React from 'react';
import clsx from 'clsx';
import { RxTableComponents } from '../../collections/RxTable';
import { RxTableError, RxTableLoader } from '../../collections/RxTable/RxTableDefaultComponents';

import { AnyObject } from '../../generic';

import { useRxTableFactory } from '../../collections/RxTable/RxTable.factory';
import {
  VirtualizedTableContext,
  VirtualizedTableProvider
} from './VirtualizedTable.context';

import { VirtualizedTableProps } from './VirtualizedTable.types';
import { VirtualizedTableBody } from './VirtualizedTableBody';
import {
  VirtualizedTableBodyCell,
  VirtualizedTableBodyRow,
  VirtualizedTableFilterCell, VirtualizedTableHeaderCell,
  VirtualizedTableNoContent
} from './VirtualizedTableDefaultComponents';
import { VirtualizedTableHeader } from './VirtualizedTableHeader';


/* --------
 * Component Declare
 * -------- */
type VirtualizedTableComponent<Data> = React.FunctionComponent<VirtualizedTableProps<Data>>;


/* --------
 * Component Render
 * -------- */
const VirtualizedTable = <Data extends AnyObject>(
  props: React.PropsWithChildren<VirtualizedTableProps<Data>>
): React.FunctionComponentElement<VirtualizedTableProps<Data>> => {

  const {
    // Virtualized Table Props
    columns,
    Components           : userDefinedComponents,
    data,
    defaultData,
    defaultLoading       : userDefinedDefaultLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSort          : userDefinedDefaultSort,
    disableHeader,
    filterLogic,
    filterRowHeight      : userDefinedFilterRowHeight,
    headerHeight         : userDefinedHeaderHeight,
    height,
    onRowClick,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    rowHeight,
    sort                 : userDefinedSort,
    style,
    width,

    // Extracted Variable Size List Props
    direction,
    itemKey,
    overscanCount,
    onItemsRendered,
    onScroll,
    useIsScrolling,

    // Remove Children
    children,

    ...rest
  } = props;

  /** Use RxTable Factory to get Data and Props */
  const rxTableProps = useRxTableFactory<Data>({
    columns,
    data,
    defaultData,
    defaultLoading       : userDefinedDefaultLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSort          : userDefinedDefaultSort,
    filterLogic,
    onRowClick,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    sort                 : userDefinedSort
  });


  /* --------
   * Compute Table Width and Height and Accessor
   * -------- */
  const headerHeight = typeof userDefinedHeaderHeight === 'number'
    ? userDefinedHeaderHeight
    : typeof rowHeight === 'number'
      ? rowHeight
      : 0;

  const filterRowHeight = rxTableProps.hasFilterRow
    ? typeof userDefinedFilterRowHeight === 'number'
      ? userDefinedFilterRowHeight
      : headerHeight
    : 0;

  const columnsWidthSum = columns.reduce((tot, { width: columnWidth }) => (
    tot + columnWidth
  ), 0);

  const effectiveWidth = Math.max(columnsWidthSum, width);
  const tableBodyHeight = height - (!disableHeader ? headerHeight : 0) - filterRowHeight;


  /* --------
   * Build the Components
   * -------- */
  const Components: RxTableComponents<Data> = {
    Body         : 'div',
    BodyCell     : VirtualizedTableBodyCell,
    BodyRow      : VirtualizedTableBodyRow,
    BodyWrapper  : 'div',
    Error        : RxTableError,
    ErrorRow     : 'div',
    ErrorCell    : 'div',
    FilterCell   : VirtualizedTableFilterCell,
    FilterRow    : 'div',
    Header       : 'div',
    HeaderCell   : VirtualizedTableHeaderCell,
    HeaderRow    : 'div',
    HeaderWrapper: 'div',
    Loader       : RxTableLoader,
    LoaderRow    : 'div',
    LoaderCell   : 'div',
    NoContent    : VirtualizedTableNoContent,
    NoContentCell: 'div',
    NoContentRow : 'div',
    ...userDefinedComponents
  };


  /* --------
   * Build Classes
   * -------- */
  const wrapperClasses = clsx('virtualized-table');


  /* --------
   * Memoized Properties
   * -------- */
  const wrapperStyle = React.useMemo<React.CSSProperties>(
    () => ({
      height   : `${height}px`,
      width    : `${width}px`,
      overflow : 'auto',
      maxHeight: '100vh',
      minHeight: '200px',
      ...style
    }),
    [ height, width, style ]
  );


  /* --------
   * VirtualList Methods
   * -------- */
  const estimatedItemSize = typeof rowHeight === 'number' ? rowHeight : undefined;

  const getRowHeight = React.useCallback(
    (index: number): number => {
      if (typeof rowHeight === 'number') {
        return rowHeight;
      }

      return rowHeight(index);
    },
    [ rowHeight ]
  );


  /* --------
   * Build the Context
   * -------- */
  const virtualizedTableContext: VirtualizedTableContext<Data> = {
    ...rxTableProps,
    columns,
    Components,
    effectiveWidth,
    filterRowHeight,
    headerHeight,
    height: tableBodyHeight,
    getRowHeight,
    width
  };


  /* --------
   * Component Render
   * -------- */
  return (
    <div
      className={wrapperClasses}
      style={wrapperStyle}
      {...rest}
    >
      <VirtualizedTableProvider value={virtualizedTableContext}>
        {!disableHeader && (
          <VirtualizedTableHeader />
        )}
        <VirtualizedTableBody
          direction={direction}
          estimatedItemSize={estimatedItemSize}
          itemKey={itemKey}
          overscanCount={overscanCount}
          onItemsRendered={onItemsRendered}
          onScroll={onScroll}
          useIsScrolling={useIsScrolling}
        />
      </VirtualizedTableProvider>
    </div>
  );

};

(VirtualizedTable as VirtualizedTableComponent<unknown>).displayName = 'VirtualizedTable';

(VirtualizedTable as VirtualizedTableComponent<unknown>).defaultProps = {
  filterLogic   : 'and',
  reloadSilently: true
};

export default VirtualizedTable;
