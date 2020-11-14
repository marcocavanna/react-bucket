import * as React from 'react';
import clsx from 'clsx';
import invariant from 'tiny-invariant';

import {
  areEqual,
  VariableSizeList,
  ListChildComponentProps
} from 'react-window';

import sortBy from 'sort-by';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';
import { Input, InputProps } from '../../elements/Input';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';

import { Icon } from '../../elements/Icon';
import TableCellContent from '../../collections/Table/TableCellContent';

import { AnyObject } from '../../generic';
import areEqualStringArray from './lib/areEqualStringArray';

import {
  useVirtualizedTable,
  VirtualizedTableProvider,
  VirtualizedTableContext
} from './VirtualizedTable.context';

import {
  VirtualizedTableComponents,
  VirtualizedTableProps
} from './VirtualizedTable.types';

import VirtualizedTableColumn from './VirtualizedTableColumn';


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
    data,
    getRowHeight,
    isRowClickEnabled,
    rowClick
  } = useVirtualizedTable();

  /** Get the Current row Size */
  const rowHeight = getRowHeight(index);

  /** Handle click on row */
  const handleRowClick = React.useCallback(
    () => {
      if (isRowClickEnabled) {
        rowClick(index);
      }
    },
    [ isRowClickEnabled, rowClick, index ]
  );

  /** Build row classes */
  const classes = clsx(
    'virtualized row',
    {
      last     : index === data.length - 1,
      first    : index === 0,
      clickable: isRowClickEnabled
    }
  );

  /** Init the left cell position container */
  let nextLeft = 0;

  return (
    <Components.BodyRow
      className={classes}
      style={{ height: rowHeight }}
      onClick={handleRowClick}
    >
      {columns.map((column) => {

        const columnLeft = nextLeft;
        nextLeft += column.width;

        const columnClasses = clsx(
          'virtualized cell',
          column.textAlign && `has-text-${column.textAlign}`,
          column.className
        );

        let columnContent: React.ReactNode | null;

        if (typeof column.render === 'function') {
          columnContent = column.render(data[index], index, data);
        }
        else if (column.cell) {
          const metaContent = typeof column.cell.meta === 'function'
            ? column.cell.meta(data[index], index, data)
            : column.cell.meta;

          const headerContent = typeof column.cell.header === 'function'
            ? column.cell.header(data[index], index, data)
            : column.cell.header;

          const contentContent = typeof column.cell.content === 'function'
            ? column.cell.content(data[index], index, data)
            : column.cell.content;

          columnContent = (
            <React.Fragment>
              {TableCellContent.create(metaContent, {
                autoGenerateKey: false,
                overrideProps  : {
                  type: 'meta'
                }
              })}
              {TableCellContent.create(headerContent, {
                autoGenerateKey: false,
                overrideProps  : {
                  type: 'title'
                }
              })}
              {TableCellContent.create(contentContent, {
                autoGenerateKey: false,
                overrideProps  : {
                  type: 'content'
                }
              })}
            </React.Fragment>
          );
        }
        else {
          columnContent = data[index][column.key];
        }

        return (
          <Components.BodyCell
            key={column.key}
            className={columnClasses}
            style={{
              ...style,
              width    : column.width,
              left     : columnLeft,
              flexBasis: column.width
            }}
          >
            <div className={'virtualized cell-content'}>
              {columnContent}
            </div>
          </Components.BodyCell>
        );
      })}
    </Components.BodyRow>
  );

};

const MemoizedVirtualizedTableRow = React.memo(VirtualizedTableRow, areEqual);


const VirtualizedTableHeader: React.FunctionComponent = () => {

  const {
    changeFilters,
    columns,
    Components,
    filterRowHeight,
    filters,
    hasFilterRow,
    headerHeight,
    sorting,
    isSortReversed,
    sort
  } = useVirtualizedTable();

  return (
    <Components.HeaderWrapper className={'virtualized table'}>
      <Components.Header className={'virtualized head'}>
        <Components.HeaderRow className={'virtualized row'} style={{ height: headerHeight }}>
          {columns.map((column) => {

            const hasSorting = Array.isArray(column.sort) && !!column.sort.length;
            const isActualSortingColumn = hasSorting && areEqualStringArray(sorting, column.sort!);

            const headerClasses = clsx(
              {
                reverse : isActualSortingColumn && isSortReversed,
                sorted  : isActualSortingColumn,
                sortable: hasSorting
              },
              'virtualized cell',
              column.textAlign && `has-text-${column.textAlign}`
            );

            const handleChangeSorting = () => {
              if (!hasSorting) {
                return;
              }

              if (isActualSortingColumn) {
                sort(column.sort!, !isSortReversed);
              }
              else {
                sort(column.sort!, false);
              }
            };

            return (
              <Components.HeaderCell
                key={column.key}
                className={headerClasses}
                style={{
                  width    : column.width,
                  flexBasis: column.width
                }}
                onClick={handleChangeSorting}
              >
                {hasSorting && (
                  <Icon
                    fitted
                    name={!isActualSortingColumn
                      ? 'sort'
                      : isSortReversed
                        ? 'sort amount down'
                        : 'sort amount down alt'}
                  />
                )}
                {column.header}
              </Components.HeaderCell>
            );
          })}
        </Components.HeaderRow>
        {hasFilterRow && filterRowHeight > 0 && (
          <Components.HeaderRow className={'virtualized filter row'} style={{ height: filterRowHeight }}>
            {columns.map((column) => {

              const headerClasses = clsx(
                'virtualized cell',
                column.textAlign && `has-text-${column.textAlign}`
              );

              let filterElement: React.ReactElement | null = null;

              if (column.filter && column.filter.type === 'input') {
                const handleFilterInputChange = (e: React.FormEvent, props: InputProps) => {
                  changeFilters(column.key, props.value);
                };

                filterElement = (
                  <Input
                    icon={'filter'}
                    {...column.filter.props}
                    value={filters[column.key] ?? ''}
                    onChange={handleFilterInputChange}
                  />
                );
              }

              return (
                <Components.HeaderCell
                  key={column.key}
                  className={headerClasses}
                  style={{
                    width    : column.width,
                    flexBasis: column.width
                  }}
                >
                  {filterElement}
                </Components.HeaderCell>
              );
            })}
          </Components.HeaderRow>
        )}
      </Components.Header>
    </Components.HeaderWrapper>
  );
};


/* --------
 * The inner element that will wrap
 * each virtualized row
 * It is the full height scrolling element
 * -------- */
const VirtualizedBody: React.FunctionComponent<VirtualizedElementProps> = (props) => {

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


/* --------
 * Outer Element
 * It will render the outer wrapper div
 * of the Virtualized Table
 * It is the fixed height/width element
 * -------- */
const VirtualizedBodyWrapper = React.forwardRef<any, VirtualizedElementProps>(
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
      'virtualized table',
      className
    );

    return (
      <Components.BodyWrapper ref={ref} className={classes} {...rest}>
        {children}
      </Components.BodyWrapper>
    );
  }
);


/* --------
 * Component Declare
 * -------- */
type VirtualizedTableRenderFunction = React.ForwardRefRenderFunction<VariableSizeList, VirtualizedTableProps>;


/* --------
 * Component Render
 * Function that will render the entire Virtualized Table
 * -------- */
const VirtualizedTableRender: VirtualizedTableRenderFunction = <Data extends AnyObject = AnyObject>(
  props: React.PropsWithChildren<VirtualizedTableProps<Data>>,
  ref: ((instance: VariableSizeList | null) => void) | React.MutableRefObject<VariableSizeList | null> | null
) => {


  /** Get Component Props */
  const {
    as,
    children,
    columns,
    Components           : userDefinedComponents,
    data,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSort          : userDefinedDefaultSort,
    direction,
    disableHeader,
    filterLogic,
    filterRowHeight      : userDefinedFilterRowHeight,
    headerHeight         : userDefinedHeaderHeight,
    height,
    itemKey,
    onItemsRendered,
    onRowClick,
    onScroll,
    onSortChange,
    overscanCount,
    reverseSorting       : userDefinedReverseSorting,
    rowHeight,
    sort                 : userDefinedSort,
    style,
    useIsScrolling,
    width,
    ...rest
  } = props;


  /* --------
   * Check while in dev mode if both children and columns
   * array exists. In this case show the error. Only once
   * data render method could be used at once
   * -------- */
  if (process.env.NODE_ENV === 'development') {
    invariant(
      !(Array.isArray(columns) && !childrenUtils.isNil(children)),
      'VirtualizedTable render function could accept only one'
      + 'render method. Choose if render data with children or with columns'
      + 'array property.'
    );
  }


  /* --------
   * Build the Components
   * -------- */
  const Components: VirtualizedTableComponents = {
    Body         : 'div',
    BodyCell     : 'div',
    BodyRow      : 'div',
    BodyWrapper  : 'div',
    Header       : 'div',
    HeaderCell   : 'div',
    HeaderRow    : 'div',
    HeaderWrapper: 'div',
    ...userDefinedComponents
  };


  /* --------
   * Compute Columns Change
   * -------- */
  const [ tableColumns, setTableColumns ] = React.useState(columns || []);
  const columnsKeys = tableColumns.map((column) => column.key);

  React.useEffect(
    () => {
      setTableColumns(columns || []);
    },
    [ columns ]
  );


  /* --------
   * Compute Table Width and Height and Accessor
   * -------- */
  const hasFilterRow = tableColumns.some((column) => !!column.filter);

  const headerHeight = typeof userDefinedHeaderHeight === 'number'
    ? userDefinedHeaderHeight
    : typeof rowHeight === 'number'
      ? rowHeight
      : 0;

  const filterRowHeight = hasFilterRow
    ? typeof userDefinedFilterRowHeight === 'number'
      ? userDefinedFilterRowHeight
      : headerHeight
    : 0;

  const columnsWidthSum = tableColumns.reduce((tot, { width: columnWidth }) => (
    tot + columnWidth
  ), 0);

  const effectiveTableWidth = Math.max(columnsWidthSum, width);
  const tableBodyHeight = height - (!disableHeader ? headerHeight : 0) - filterRowHeight;


  /* --------
   * Compute Filtering
   * -------- */
  const [ filters, setFilteringValues ] = React.useState<{ update: number, values: Record<string, any> }>({
    update: Date.now(),
    values: tableColumns.reduce<Record<string, any>>((acc, column) => {
      if (column.filter) {
        acc[column.key] = column.filter.initialValue;
      }
      return acc;
    }, {})
  });

  const handleFilterChange = (columnKey: string, value: any) => {
    setFilteringValues({
      update: Date.now(),
      values: {
        ...filters.values,
        [columnKey]: value
      }
    });
  };

  const filteredData = React.useMemo(
    () => {
      /** If no filter, return entire data */
      if (!hasFilterRow) {
        return data;
      }

      /** Get only filter columns */
      const filterColumns = tableColumns.filter((column) => {
        if (!column.filter) {
          return false;
        }

        if (column.filter.type === 'input') {
          return typeof filters.values[column.key] === 'string' && !!filters.values[column.key].length;
        }

        if (column.filter.type === 'checkbox') {
          return typeof filters.values[column.key] === 'boolean' && !!filters.values[column.key];
        }

        return false;
      });

      /** If no columns are able to filter data, return entire data set */
      if (!filterColumns.length) {
        return data;
      }

      /** Filter data using columns */
      return data.filter((row, index, array) => {
        return filterColumns.reduce<boolean>((show, next) => (
          filterLogic === 'and'
            ? show && next.filter!.show(filters.values[next.key] as never, row, index, array)
            : show || next.filter!.show(filters.values[next.key] as never, row, index, array)
        ), true);
      });
    },
    [ hasFilterRow, tableColumns, data, filters.values, filterLogic ]
  );


  /* --------
   * Control Sorting
   * -------- */
  const [ sorting, trySetSorting ] = useAutoControlledValue([], {
    defaultProp: userDefinedDefaultSort,
    prop       : userDefinedSort
  });

  const [ isSortReversed, trySetReverseSorting ] = useAutoControlledValue(false, {
    defaultProp: userDefinedDefaultReverseSorting,
    prop       : userDefinedReverseSorting
  });

  const handleChangeSorting = React.useCallback(
    (newSorting: string[], reverse: boolean) => {
      /** Check if sorting is changed */
      const isSortChanged = !areEqualStringArray(sorting, newSorting);
      const isReversingChanged = reverse !== isSortReversed;

      /** If no change, return */
      if (!isSortChanged && !isReversingChanged) {
        return;
      }

      /** Call user defined handler */
      if (onSortChange) {
        onSortChange(newSorting, reverse);
      }

      /** Try to set new Sorting */
      if (isSortChanged) {
        trySetSorting(newSorting);
      }

      if (reverse !== isSortReversed) {
        trySetReverseSorting(reverse);
      }
    },
    [ onSortChange, isSortReversed, sorting, trySetReverseSorting, trySetSorting ]
  );

  const sortedData = React.useMemo(
    () => {
      if (sorting.length) {
        const sorted = filteredData.sort(sortBy(...sorting));
        return isSortReversed
          ? sorted.reverse()
          : sorted;
      }

      return filteredData;
    },
    [ filteredData, sorting, isSortReversed ]
  );


  /* --------
   * Side Handlers
   * -------- */
  const handleRowClick = React.useCallback(
    (index: number) => {
      if (onRowClick) {
        onRowClick(sortedData[index], index, sortedData);
      }
    },
    [ onRowClick, sortedData ]
  );


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

  const getItemSize = React.useCallback(
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
    changeFilters    : handleFilterChange,
    columns          : tableColumns,
    Components,
    data             : sortedData,
    effectiveWidth   : effectiveTableWidth,
    filterRowHeight,
    filters          : filters.values,
    hasFilterRow,
    headerHeight,
    height,
    isRowClickEnabled: typeof onRowClick === 'function',
    isSortReversed,
    getRowHeight     : getItemSize,
    registerColumn   : (column) => {
      /** Check column does not exists */
      if (columnsKeys.indexOf(column.key) === -1) {
        setTableColumns((curr) => {
          curr.push(column);
          return curr;
        });

        if (column.filter && column.filter.initialValue) {
          handleFilterChange(column.key, column.filter.initialValue);
        }
      }
    },
    rowClick         : handleRowClick,
    sort             : handleChangeSorting,
    sorting,
    width,
    unregisterColumn : (key) => {
      /** Remove the column */
      setTableColumns((curr) => (
        curr.filter((column) => column.key !== key)
      ));
    }
  };


  /* --------
   * Return the Component
   * -------- */
  return (
    <div
      className={wrapperClasses}
      style={wrapperStyle}
      {...rest}
    >
      <VirtualizedTableProvider value={virtualizedTableContext}>
        {/* Header Render */}
        {!disableHeader && headerHeight > 0 && (
          <VirtualizedTableHeader />
        )}
        {/* Virtualized List Renderer */}
        {!!sortedData.length && (
          <VariableSizeList
            ref={ref}
            direction={direction}
            estimatedItemSize={estimatedItemSize}
            innerElementType={VirtualizedBody}
            itemSize={getItemSize}
            height={tableBodyHeight}
            itemCount={sortedData.length}
            itemKey={itemKey}
            outerElementType={VirtualizedBodyWrapper}
            overscanCount={overscanCount}
            useIsScrolling={useIsScrolling}
            width={effectiveTableWidth}
            onItemsRendered={onItemsRendered}
            onScroll={onScroll}
          >
            {MemoizedVirtualizedTableRow}
          </VariableSizeList>
        )}
      </VirtualizedTableProvider>
    </div>
  );
};

type VirtualizedTableComponent =
  React.FunctionComponent<VirtualizedTableProps>
  & { Column: typeof VirtualizedTableColumn };

// eslint-disable-next-line max-len
const VirtualizedTable: VirtualizedTableComponent = React.forwardRef(VirtualizedTableRender) as unknown as VirtualizedTableComponent;

VirtualizedTable.displayName = 'VirtualizedTable';

VirtualizedTable.defaultProps = {
  filterLogic: 'and'
};

VirtualizedTable.Column = VirtualizedTableColumn;

// eslint-disable-next-line max-len
export default VirtualizedTable as unknown as (<Data extends AnyObject>(props: VirtualizedTableProps<Data>) => React.ReactElement<VirtualizedTableProps<Data>>) & { Column: typeof VirtualizedTableColumn };
