import * as React from 'react';
import clsx from 'clsx';

import { PropsWithAs } from '@appbuckets/react-ui-core';

import { AnyObject } from '../../generic';

import { useElementType } from '../../lib';

import { RxTableContext, RxTableProvider } from './RxTable.context';
import { useRxTableFactory } from './RxTable.factory';

import { RxTableComponents, RxTableProps } from './RxTable.types';

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
  props: React.PropsWithChildren<RxTableProps<Data>>
): React.FunctionComponentElement<RxTableProps<Data>> => {

  const {
    as,
    className,
    columns,
    Components           : userDefinedComponents,
    data,
    defaultData,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSort          : userDefinedDefaultSort,
    disableHeader,
    filterLogic,
    initiallyLoading,
    onRowClick,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    rowKey,
    sort                 : userDefinedSort,
    style,
    ...rest
  } = props;

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
    filterLogic,
    onRowClick,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
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
   * Row Key Getter
   * -------- */
  const getRowKey = React.useCallback(
    (row: Data, index: number) => {
      if (typeof rowKey === 'function') {
        return rowKey(row, index, rxTableProps.tableData);
      }

      return row[rowKey];
    },
    [ rowKey, rxTableProps.tableData ]
  );


  /* --------
   * Context Building
   * -------- */
  const rxTableContext: RxTableContext<Data> = {
    ...rxTableProps,
    Components,
    columns,
    getRowKey
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

(RxTable as RxTableComponent<any>).defaultProps = {
  as              : Table,
  filterLogic     : 'and',
  initiallyLoading: true,
  reloadSilently  : true
};

export default RxTable;
