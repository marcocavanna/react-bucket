import * as React from 'react';
import clsx from 'clsx';

import { PropsWithAs } from '@appbuckets/react-ui-core';

import { AnyObject } from '../../generic';

import { useElementType } from '../../lib';
import { useWithDefaultProps } from '../../context/BucketContext';

import { RxTableContext, RxTableProvider } from './RxTable.context';
import { useRxTableFactory } from './RxTable.factory';

import { RxTableColumnProps, RxTableComponents, RxTableProps } from './RxTable.types';

import {
  RxTableBodyCell,
  RxTableBodyRow,
  RxTableError,
  RxTableFilterCell,
  RxTableHeaderCell,
  RxTableLoader,
  RxTableNoContent
} from './RxTableDefaultComponents';

import { Table } from '../Table';

import { RxTableBody } from './RxTableBody';
import { RxTableHeader } from './RxTableHeader';


/* --------
 * Component Declare
 * -------- */
type RxTableComponent<Data> = React.FunctionComponent<RxTableProps<Data>>;


/* --------
 * Component Render
 * -------- */
const RxTable = <Data extends AnyObject>(
  receivedProps: React.PropsWithChildren<RxTableProps<Data>>
): React.FunctionComponentElement<RxTableProps<Data>> => {

  const props = useWithDefaultProps('rxTable', receivedProps);

  const {
    as,
    className,
    columns   : userDefinedColumns,
    Components: userDefinedComponents,
    data,
    defaultData,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSelectedData  : userDefinedSelectedData,
    defaultSort          : userDefinedDefaultSort,
    disableHeader,
    filterLogic,
    getRowKey: userDefinedGetRowKey,
    initiallyLoading,
    loaderProps,
    noFilteredDataEmptyContentProps,
    noDataEmptyContentProps,
    onRowClick,
    onSortChange,
    onSelectedDataChange,
    reloadDependency,
    reloadSilently,
    reverseSorting: userDefinedReverseSorting,
    selectable,
    selectColumnProps,
    sort: userDefinedSort,
    style,
    ...rest
  } = props;


  // ----
  // Update Columns Field using Selectable
  // ----
  const columns: RxTableColumnProps<Data>[] = React.useMemo(
    () => {
      /** If table isn't selectable, return columns */
      if (!selectable) {
        return userDefinedColumns;
      }

      /** Return Columns width Select Column Props and Default */
      return [
        {
          key      : '%%selectable%%',
          width    : 36,
          textAlign: 'center',
          ...selectColumnProps
        },
        ...userDefinedColumns
      ];
    },
    [ userDefinedColumns, selectable, selectColumnProps ]
  );


  /** Get right element type */
  const ElementType = useElementType(RxTable, props as unknown as PropsWithAs<RxTableProps<AnyObject>>);


  /** Use RxTable Factory to get Data and Props */
  const rxTableProps = useRxTableFactory<Data>({
    columns,
    data,
    defaultData,
    defaultLoading       : initiallyLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSort          : userDefinedDefaultSort,
    getRowKey            : userDefinedGetRowKey,
    filterLogic,
    onRowClick,
    onSelectedDataChange,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    selectable,
    sort                 : userDefinedSort
  });


  /** Build the element class list */
  const classes = clsx(
    rxTableProps.hasFilterRow && 'filterable',
    'rx-table',
    className
  );


  /* --------
   * Define RxTable Components
   * -------- */
  const Components: RxTableComponents<Data> = {
    Body         : Table.Body,
    BodyCell     : RxTableBodyCell,
    BodyRow      : RxTableBodyRow,
    BodyWrapper  : React.Fragment,
    Error        : RxTableError,
    ErrorRow     : Table.Row,
    ErrorCell    : Table.Cell,
    FilterCell   : RxTableFilterCell,
    FilterRow    : Table.Row,
    Header       : Table.Header,
    HeaderCell   : RxTableHeaderCell,
    HeaderRow    : Table.Row,
    HeaderWrapper: React.Fragment,
    Loader       : RxTableLoader,
    LoaderRow    : Table.Row,
    LoaderCell   : Table.Cell,
    NoContent    : RxTableNoContent,
    NoContentCell: Table.Cell,
    NoContentRow : Table.Row,
    ...userDefinedComponents
  };


  /* --------
   * Context Building
   * -------- */
  const rxTableContext: RxTableContext<Data> = {
    ...rxTableProps,
    Components,
    columns,
    loaderProps,
    noFilteredDataEmptyContentProps,
    noDataEmptyContentProps
  };


  /* --------
   * Component Render
   * -------- */
  return (
    <RxTableProvider value={rxTableContext}>
      <ElementType className={classes} {...rest}>
        <RxTableHeader />
        <RxTableBody />
      </ElementType>
    </RxTableProvider>
  );
};

(RxTable as RxTableComponent<any>).displayName = 'RxTable';

export default RxTable;
