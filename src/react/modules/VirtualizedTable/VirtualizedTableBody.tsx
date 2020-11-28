import * as React from 'react';
import clsx from 'clsx';

import {
  VariableSizeList,
  ListChildComponentProps,
  areEqual
} from 'react-window';

import { RxTableBodyCell } from '../../collections/RxTable/RxTableBody';
import { Checkbox } from '../../elements/Checkbox';

import { useVirtualizedTable } from './VirtualizedTable.context';
import { PickedVariableSizeList } from './VirtualizedTable.types';


/* --------
 * Useful internal types
 * -------- */
type VirtualizedElementProps = {
  children: React.ReactNode;
  className: string;
  onScroll: (...args: any[]) => void;
  style: React.CSSProperties;
};


/* --------
 * Row Selects
 * -------- */
const VirtualizedTableRowSelector: React.FunctionComponent<{ row: any }> = (
  props
) => {
  const {
    row
  } = props;

  const {
    isRowSelected,
    toggleSelectRow
  } = useVirtualizedTable();

  const handleToggleRow = React.useCallback(
    () => {
      toggleSelectRow(row);
    },
    [ toggleSelectRow, row ]
  );

  return (
    <Checkbox
      checked={isRowSelected(row)}
      onClick={handleToggleRow}
    />
  );
};


/* --------
 * Render each row
 * -------- */
const VirtualizedTableRow: React.FunctionComponent<ListChildComponentProps> = (
  props
) => {

  const {
    index,
    style
  } = props;

  const {
    columns,
    Components,
    tableData,
    getRowHeight,
    isRowClickEnabled,
    handleRowClick: superHandleRowClick,
    isSelectable
  } = useVirtualizedTable();

  /** Get Row Data */
  const row = tableData[index];

  /** Get the Current row Size */
  const rowHeight = getRowHeight(index);

  /** Build row classes */
  const classes = clsx(
    'virtualized row',
    {
      last     : index === tableData.length - 1,
      first    : index === 0,
      clickable: isRowClickEnabled
    }
  );


  /* --------
   * Handlers
   * -------- */
  const handleRowClick = React.useCallback(
    () => {
      superHandleRowClick(index);
    },
    [ superHandleRowClick, index ]
  );


  /* --------
   * Return the Component
   * -------- */
  return (
    <Components.BodyRow
      className={classes}
      columns={columns}
      index={index}
      onClick={isRowClickEnabled ? handleRowClick : undefined}
      style={{ ...style, height: rowHeight }}
      row={row}
    >
      {columns.map((column, columnIndex) => (
        <RxTableBodyCell
          className={'virtualized cell'}
          key={column.key}
          Component={Components.BodyCell}
          column={column}
          tableData={tableData}
          index={index}
          row={row}
          columnIndex={columnIndex}
          isSelectable={isSelectable}
          SelectorComponent={VirtualizedTableRowSelector}
        />
      ))}
    </Components.BodyRow>
  );
};

const MemoizedVirtualizedTableRow = React.memo(VirtualizedTableRow, areEqual);


/* --------
 * The inner element that will wrap
 * each virtualized row
 * It is the full height scrolling element
 * -------- */
const VirtualizedTableBody: React.FunctionComponent<VirtualizedElementProps> = (props) => {

  const {
    children,
    className,
    ...rest
  } = props;

  const {
    Components
  } = useVirtualizedTable();

  const classes = clsx(
    'virtualized body',
    className
  );

  return (
    <Components.Body className={classes} {...rest}>
      {children}
    </Components.Body>
  );
};

VirtualizedTableBody.displayName = 'VirtualizedTableBody';

export { VirtualizedTableBody };


/* --------
 * Outer Element
 * It will render the outer wrapper div
 * of the Virtualized Table
 * It is the fixed height/width element
 * -------- */
const VirtualizedTableBodyWrapper = React.forwardRef<any, VirtualizedElementProps>(
  (props, ref) => {
    const {
      children,
      className,
      ...rest
    } = props;

    const {
      Components
    } = useVirtualizedTable();

    const classes = clsx(
      'virtualized table virtualized-body',
      className
    );

    return (
      <Components.BodyWrapper ref={ref} className={classes} {...rest}>
        {children}
      </Components.BodyWrapper>
    );
  }
);

VirtualizedTableBodyWrapper.displayName = 'VirtualizedTableBodyWrapper';

export { VirtualizedTableBodyWrapper };


/* --------
 * Component Definition
 * -------- */
interface VirtualizedTableBodyProps extends PickedVariableSizeList {
  estimatedItemSize?: number;
}

const VirtualizedBody: React.FunctionComponent<VirtualizedTableBodyProps> = (
  props
) => {

  const {
    columns,
    Components,
    effectiveWidth,
    error,
    getRowHeight,
    height,
    filters,
    isLoading,
    tableData
  } = useVirtualizedTable();

  const {
    direction,
    estimatedItemSize,
    itemKey,
    overscanCount,
    onItemsRendered,
    onScroll,
    useIsScrolling
  } = props;

  /** Show the Loader while requesting data */
  if (isLoading) {
    return (
      <Components.BodyWrapper>
        <Components.Body>
          <Components.LoaderRow className={'row loading-row'}>
            <Components.LoaderCell colSpan={columns.length} className={'cell loading-cell'}>
              <Components.Loader />
            </Components.LoaderCell>
          </Components.LoaderRow>
        </Components.Body>
      </Components.BodyWrapper>
    );
  }

  /** If an error occurred, show dedicated component */
  if (error) {
    return (
      <Components.BodyWrapper>
        <Components.Body>
          <Components.ErrorRow className={'row error-row'}>
            <Components.ErrorCell colSpan={columns.length} className={'cell error-cell'}>
              <Components.Error error={error} />
            </Components.ErrorCell>
          </Components.ErrorRow>
        </Components.Body>
      </Components.BodyWrapper>
    );
  }

  /** Render no Content */
  if (!tableData.length) {
    return (
      <Components.BodyWrapper>
        <Components.Body>
          <Components.NoContentRow className={'row no-content-row'}>
            <Components.NoContentCell colSpan={columns.length} className={'cell no-content-cell'}>
              <Components.NoContent filters={filters} />
            </Components.NoContentCell>
          </Components.NoContentRow>
        </Components.Body>
      </Components.BodyWrapper>
    );
  }

  return (
    <VariableSizeList
      direction={direction}
      itemKey={itemKey}
      overscanCount={overscanCount}
      onItemsRendered={onItemsRendered}
      onScroll={onScroll}
      useIsScrolling={useIsScrolling}
      width={effectiveWidth}
      height={height}
      itemSize={getRowHeight}
      estimatedItemSize={estimatedItemSize}
      itemCount={tableData.length}
      innerElementType={VirtualizedTableBody}
      outerElementType={VirtualizedTableBodyWrapper}
    >
      {MemoizedVirtualizedTableRow}
    </VariableSizeList>
  );
};

VirtualizedBody.displayName = 'VirtualizedTableBody';

export { VirtualizedBody };
