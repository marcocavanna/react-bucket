import * as React from 'react';
import clsx from 'clsx';

import { AnyObject } from '../../generic';

import { useRxTableFactory } from '../../collections/RxTable/RxTable.factory';
import { RxTableColumnProps, RxTableComponents } from '../../collections/RxTable';
import { RxTableError } from '../../collections/RxTable/RxTableDefaultComponents';

import {
  VirtualizedTableContext,
  VirtualizedTableProvider
} from './VirtualizedTable.context';

import { MandatoryVirtualizedColumnProps, VirtualizedTableProps } from './VirtualizedTable.types';

import {
  VirtualizedTableBodyCell,
  VirtualizedTableBodyRow,
  VirtualizedTableFilterCell,
  VirtualizedTableHeaderCell,
  VirtualizedTableLoader,
  VirtualizedTableNoContent
} from './VirtualizedTableDefaultComponents';

import { VirtualizedTableBody } from './VirtualizedTableBody';
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
    columns              : userDefinedColumns,
    Components           : userDefinedComponents,
    data,
    defaultData,
    defaultLoading       : userDefinedDefaultLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSelectedData  : userDefinedDefaultSelectedData,
    defaultSort          : userDefinedDefaultSort,
    disableHeader,
    noDataEmptyContentProps,
    noFilteredDataEmptyContentProps,
    filterLogic,
    filterRowHeight      : userDefinedFilterRowHeight,
    getRowKey,
    headerHeight         : userDefinedHeaderHeight,
    height,
    loaderProps,
    onRowClick,
    onSelectedDataChange,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    rowHeight,
    selectable,
    selectColumnProps,
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


  // ----
  // Update Columns Field using Selectable
  // ----
  const columns: RxTableColumnProps<Data, MandatoryVirtualizedColumnProps>[] = React.useMemo(
    () => {
      /** If table isn't selectable, return columns */
      if (!selectable) {
        return userDefinedColumns;
      }

      /** Return Columns width Select Column Props and Default */
      return [
        {
          key  : '%%selectable%%',
          width: 50,
          ...selectColumnProps
        },
        ...userDefinedColumns
      ];
    },
    [ userDefinedColumns, selectable, selectColumnProps ]
  );


  /** Use RxTable Factory to get Data and Props */
  const rxTableProps = useRxTableFactory<Data>({
    columns,
    data,
    defaultData,
    defaultLoading       : userDefinedDefaultLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSelectedData  : userDefinedDefaultSelectedData,
    defaultSort          : userDefinedDefaultSort,
    filterLogic,
    getRowKey,
    onRowClick,
    onSelectedDataChange,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    selectable,
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

  const tableBodyHeight = height - (!disableHeader ? headerHeight : 0) - filterRowHeight;


  /* --------
   * Compute Column Fixed Width and flexible available space
   * -------- */
  const columnsWidth: Record<string, number> = React.useMemo(
    () => {
      /** Build the Columns Container */
      const widths: Record<string, number> = {};

      /** Get the fixed used space */
      const availableFlexibleSpace = width - columns
        .filter((column) => (
          typeof column.width === 'number' && (!column.widthType || column.widthType === 'fixed')
        ))
        .reduce<number>((total, next) => total + (next.width as number), 0);

      /** Get total available spacing for auto column */
      let autoFlexibleSpace = availableFlexibleSpace;

      /** Loop each column to build width */
      columns
        .filter((column) => typeof column.width === 'number')
        .forEach((column) => {
          /** Calc percentage space */
          if (column.widthType === 'percentage') {
            const columnWidth = (availableFlexibleSpace / 100) * (column.width as number);
            widths[column.key] = columnWidth;
            autoFlexibleSpace -= columnWidth;
            return;
          }

          /** Return the user defined width */
          widths[column.key] = column.width as number;
        });

      const autoSizingColumns = columns.filter((column) => column.width === 'auto');

      /** Get the maximum grow factor */
      const totalGrowFactor = autoSizingColumns.reduce<number>((max, { growFactor }) => (
        max + Math.max(1, (growFactor ?? 1))
      ), 0);

      /** Compute the Auto Sizing Columns */
      autoSizingColumns
        .forEach((column) => {
          /** Divide the spacing equally */
          widths[column.key] = (autoFlexibleSpace / totalGrowFactor) * Math.max(1, (column.growFactor ?? 1));
        });

      return widths;
    },
    [ columns, width ]
  );

  const totalColumnsWidth = Object.keys(columnsWidth).reduce<number>((totalWidth, nextKey) => (
    totalWidth + (columnsWidth[nextKey])
  ), 0);

  const effectiveWidth = Math.max(width, totalColumnsWidth);

  const getColumnWidth = React.useCallback(
    (key: string) => {
      /** Check if is last column */
      const isLast = columns[columns.length - 1].key === key;

      /** If is not last then return its declared width */
      if (!isLast) {
        return columnsWidth[key] ?? 0;
      }

      /** Else, return the remain width */
      const restColumnsWidth = Object.keys(columnsWidth).reduce<number>((totalWidth, nextKey) => (
        nextKey === key
          ? totalWidth
          : totalWidth + (columnsWidth[nextKey])
      ), 0);

      return effectiveWidth - restColumnsWidth;
    },
    [ columnsWidth, columns, effectiveWidth ]
  );


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
    Loader       : VirtualizedTableLoader,
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
    noDataEmptyContentProps,
    noFilteredDataEmptyContentProps,
    filterRowHeight,
    headerHeight,
    height: tableBodyHeight,
    getColumnWidth,
    getRowHeight,
    loaderProps,
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
