import * as React from 'react';
import clsx from 'clsx';

import { PropsWithAs } from '@appbuckets/react-ui-core';

import { AnyObject } from '../../generic';
import { useElementSize } from '../../hooks/useElementSize';

import { useElementType } from '../../lib';
import { useWithDefaultProps } from '../../context/BucketContext';
import BodyRow from './components/BodyRow';

import { RxTableContext, RxTableProvider } from './RxTable.context';
import { useRxTableFactory } from './RxTable.factory';

import { RxTableComponents, RxTableProps } from './RxTable.types';

import { Table } from '../Table';

import FiltersRow from './components/FiltersRow';
import HeaderRow from './components/HeaderRow';
import StateDependentBodyRow from './components/StateDependentBodyRow';

import RxTableBodyCell from './defaults/RxTableBodyCell';
import RxTableBodyRow from './defaults/RxTableBodyRow';
import RxTableEmptyContent from './defaults/RxTableEmptyContent';
import RxTableError from './defaults/RxTableError';
import RxTableHeaderCell from './defaults/RxTableHeaderCell';
import RxTableLoader from './defaults/RxTableLoader';


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
    classes: userDefinedClasses,
    className,
    columns,
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
    styles: userDefinedStyles,
    width : userDefinedWidth,
    ...rest
  } = props;


  // ----
  // Get the Right Element Type
  // ----
  const ElementType = useElementType(RxTable, props as unknown as PropsWithAs<RxTableProps<AnyObject>>);


  // ----
  // Initialize the Width Detector
  // ----
  const [ widthDetector, { width: detectedWidth } ] = useElementSize({
    disabled     : typeof userDefinedWidth === 'number',
    disableHeight: true
  });


  // ----
  // Load RxTableProps
  // ----
  const rxTableProps = useRxTableFactory<Data>({
    classes              : userDefinedClasses,
    columns,
    data,
    defaultData,
    defaultLoading       : initiallyLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSelectedData  : userDefinedSelectedData,
    defaultSort          : userDefinedDefaultSort,
    filterLogic,
    getRowKey            : userDefinedGetRowKey,
    onRowClick,
    onSelectedDataChange,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    selectable,
    selectColumnProps,
    sort                 : userDefinedSort,
    styles               : userDefinedStyles,
    width                : userDefinedWidth ?? detectedWidth ?? 0
  });


  // ----
  // Build Table ClassList
  // ----
  const classes = clsx(
    rxTableProps.layout.hasFilterRow && 'filterable',
    'rx-table',
    className
  );


  // ----
  // Define RxTable Components
  // ----
  const Components: RxTableComponents<Data> = {
    Body         : Table.Body,
    BodyCell     : RxTableBodyCell,
    BodyRow      : RxTableBodyRow,
    BodyWrapper  : React.Fragment,
    Error        : RxTableError,
    ErrorRow     : Table.Row,
    ErrorCell    : Table.Cell,
    Header       : Table.Header,
    HeaderCell   : RxTableHeaderCell,
    HeaderRow    : Table.Row,
    HeaderWrapper: React.Fragment,
    Loader       : RxTableLoader,
    LoaderRow    : Table.Row,
    LoaderCell   : Table.Cell,
    NoContent    : RxTableEmptyContent,
    NoContentCell: Table.Cell,
    NoContentRow : Table.Row,
    ...userDefinedComponents
  };


  // ----
  // Context Building
  // ----
  const rxTableContext: RxTableContext<Data> = {
    ...rxTableProps,
    Components,
    loaderProps,
    noFilteredDataEmptyContentProps,
    noDataEmptyContentProps
  };


  // ----
  // Fragments could not have properties extra from key
  // ----
  const headerWrapperProps = Components.HeaderWrapper !== React.Fragment
    ? { className: rxTableProps.classes.HeaderWrapper, style: rxTableProps.styles.HeaderWrapper }
    : {};

  const bodyWrapperProps = Components.BodyWrapper !== React.Fragment
    ? { className: rxTableProps.classes.BodyWrapper, style: rxTableProps.styles.BodyWrapper }
    : {};


  // ----
  // Build the Component that will render Body Rows
  // ----
  const BodyRows = React.useCallback<React.FunctionComponent>(
    () => (
      <React.Fragment>
        {rxTableProps.tableData.map((row, index) => (
          <BodyRow
            key={rxTableProps.selection.getRowKey(row, index, rxTableProps.tableData)}
            index={index}
          />
        ))}
      </React.Fragment>
    ),
    [ rxTableProps.selection, rxTableProps.tableData ]
  );


  // ----
  // Component Render
  // ----
  return (
    <RxTableProvider value={rxTableContext}>
      {/* Width Detector Element */}
      {widthDetector}

      {/* Table Component */}
      <ElementType className={classes} {...rest}>

        {/* Table Header */}
        {(rxTableProps.layout.hasHeaderRow || rxTableProps.layout.hasFilterRow) && (
          <Components.HeaderWrapper {...headerWrapperProps}>
            <Components.Header style={rxTableProps.styles.Header} className={rxTableProps.classes.Header}>
              {/* Header Row Render */}
              {rxTableProps.layout.hasHeaderRow && !disableHeader && <HeaderRow />}
              {/* Filter Row Render */}
              {rxTableProps.layout.hasFilterRow && <FiltersRow />}
            </Components.Header>
          </Components.HeaderWrapper>
        )}

        {/* Table Body */}
        <Components.BodyWrapper {...bodyWrapperProps}>
          <Components.Body style={rxTableProps.styles.Body} className={rxTableProps.classes.Body}>
            <StateDependentBodyRow Content={BodyRows} />
          </Components.Body>
        </Components.BodyWrapper>

      </ElementType>
    </RxTableProvider>
  );
};

(RxTable as RxTableComponent<any>).displayName = 'RxTable';

(RxTable as RxTableComponent<any>).defaultProps = {
  as: Table
};

export default RxTable;
