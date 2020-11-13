import { MutableRefObject } from 'react';
import * as React from 'react';
import clsx from 'clsx';
import invariant from 'tiny-invariant';

import {
  areEqual,
  VariableSizeList,
  ListChildComponentProps
} from 'react-window';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';
import TableCellContent from '../../collections/Table/TableCellContent';

import { AnyObject } from '../../generic';

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
    getRowHeight
  } = useVirtualizedTable();

  const rowHeight = getRowHeight(index);

  let nextLeft = 0;

  return (
    <Components.BodyRow
      className={`virtualized row ${index === data.length - 1 ? 'last' : ''}`}
      style={{ height: rowHeight }}
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
    columns,
    Components,
    headerHeight
  } = useVirtualizedTable();

  return (
    <Components.HeaderWrapper className={'virtualized table'}>
      <Components.Header className={'virtualized head'}>
        <Components.HeaderRow className={'virtualized row'} style={{ height: headerHeight }}>
          {columns.map((column) => {

            const headerClasses = clsx(
              'virtualized cell',
              column.textAlign && `has-text-${column.textAlign}`
            );

            return (
              <Components.HeaderCell
                key={column.key}
                className={headerClasses}
                style={{
                  width    : column.width,
                  flexBasis: column.width
                }}
              >
                {column.header}
              </Components.HeaderCell>
            );
          })}
        </Components.HeaderRow>
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
  ref: ((instance: VariableSizeList | null) => void) | MutableRefObject<VariableSizeList | null> | null
) => {


  /** Get Component Props */
  const {
    as,
    children,
    columns,
    Components  : userDefinedComponents,
    data,
    direction,
    disableHeader,
    headerHeight: userDefinedHeaderHeight,
    height,
    itemKey,
    onItemsRendered,
    onScroll,
    overscanCount,
    rowHeight,
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
   * Compute Table Width and Height
   * -------- */
  const headerHeight = typeof userDefinedHeaderHeight === 'number'
    ? userDefinedHeaderHeight
    : typeof rowHeight === 'number'
      ? rowHeight
      : 0;

  const columnsWidthSum = tableColumns.reduce((tot, { width: columnWidth }) => (
    tot + columnWidth
  ), 0);

  const effectiveTableWidth = Math.max(columnsWidthSum, width);
  const tableBodyHeight = height - (!disableHeader ? headerHeight : 0);


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
    columns         : tableColumns,
    Components,
    data,
    effectiveWidth  : effectiveTableWidth,
    headerHeight,
    height,
    getRowHeight    : getItemSize,
    registerColumn  : (column) => {
      /** Check column does not exists */
      if (columnsKeys.indexOf(column.key) === -1) {
        setTableColumns((curr) => {
          curr.push(column);
          return curr;
        });
      }
    },
    width,
    unregisterColumn: (key) => {
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
        {!!data.length && (
          <VariableSizeList
            ref={ref}
            direction={direction}
            estimatedItemSize={estimatedItemSize}
            innerElementType={VirtualizedBody}
            itemSize={getItemSize}
            height={tableBodyHeight}
            itemCount={data.length}
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

VirtualizedTableRender.displayName = 'VirtualizedTable';


type VirtualizedTableComponent =
  React.FunctionComponent<VirtualizedTableProps>
  & { Column: typeof VirtualizedTableColumn };

// eslint-disable-next-line max-len
const VirtualizedTable: VirtualizedTableComponent = React.forwardRef(VirtualizedTableRender) as unknown as VirtualizedTableComponent;

VirtualizedTable.Column = VirtualizedTableColumn;

export default VirtualizedTable;
