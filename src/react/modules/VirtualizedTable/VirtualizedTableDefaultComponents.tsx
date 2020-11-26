import clsx from 'clsx';
import * as React from 'react';

import {
  RxTableCellComponent,
  RxTableFilterCellComponent,
  RxTableHeaderCellComponent,
  RxTableRowComponent
} from '../../collections/RxTable';

import TableCellContent from '../../collections/Table/TableCellContent';
import TableHeaderCell from '../../collections/Table/TableHeaderCell';
import { Box } from '../../elements/Box';

import { EmptyContent } from '../../elements/EmptyContent';
import { Loader } from '../../elements/Loader';

import { useVirtualizedTable } from './VirtualizedTable.context';


/* --------
 * Virtualized Table Header Cell
 * -------- */
const VirtualizedTableHeaderCell: RxTableHeaderCellComponent = (
  props
) => {

  const {
    className,
    content,
    column,
    hasSorting,
    isActualSortingColumn,
    isReversedSorting,
    onClick
  } = props;

  return TableHeaderCell.create(content ?? '', {
    autoGenerateKey: false,
    defaultProps   : {
      className
    },
    overrideProps  : (defaultProps) => ({
      as      : 'div',
      sortable: hasSorting,
      sorted  : isActualSortingColumn
        ? (isReversedSorting ? 'desc' : 'asc')
        : undefined,
      onClick : (event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
        if (onClick) {
          onClick();
        }
        if (defaultProps.onClick) {
          defaultProps.onClick(event);
        }
      },
      style   : {
        width    : column.width,
        flexBasis: column.width
      }
    })
  });
};

VirtualizedTableHeaderCell.displayName = 'VirtualizedTableHeaderCell';

export { VirtualizedTableHeaderCell };


/* --------
 * Virtualized Table Cell
 * -------- */
const VirtualizedTableBodyCell: RxTableCellComponent<any> = (
  props
) => {
  const {
    className,
    column,
    data,
    index,
    row
  } = props;

  /** Build style */
  const style: React.CSSProperties = {
    width    : column.width ?? 0,
    flexBasis: column.width ?? 0
  };

  /** Render the Cell with function if exists */
  if (typeof column.render === 'function') {
    return (
      <div className={className} style={style}>
        <div className={'virtualized cell-content'}>
          {column.render(row, index, data)}
        </div>
      </div>
    );
  }

  /** Render Cell with Cell Shorthand Definition */
  if (column.cell) {
    const metaContent = typeof column.cell.meta === 'function'
      ? column.cell.meta(row, index, data)
      : column.cell.meta;

    const headerContent = typeof column.cell.header === 'function'
      ? column.cell.header(row, index, data)
      : column.cell.header;

    const contentContent = typeof column.cell.content === 'function'
      ? column.cell.content(row, index, data)
      : column.cell.content;

    return (
      <div className={className} style={style}>
        <div className={'virtualized cell-content'}>
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
        </div>
      </div>
    );
  }

  /** Render using the key */
  return (
    <div className={className} style={style}>
      <div className={'virtualized cell-content'}>
        {TableCellContent.create(row[column.key], {
          autoGenerateKey: false,
          overrideProps  : {
            type: 'title'
          }
        })}
      </div>
    </div>
  );
};

VirtualizedTableBodyCell.displayName = 'VirtualizedTableBodyCell';

export { VirtualizedTableBodyCell };


/* --------
 * Table Row
 * -------- */
const VirtualizedTableBodyRow: RxTableRowComponent<any> = (
  props
) => {

  const {
    children,
    className,
    onClick,
    style
  } = props;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={className} style={style} onClick={onClick}>
      {children}
    </div>
  );

};

VirtualizedTableBodyRow.displayName = 'VirtualizedTableBodyRow';

export { VirtualizedTableBodyRow };


/* --------
 * Table Filter Cell
 * -------- */
const VirtualizedTableFilterCell: RxTableFilterCellComponent = (
  props
) => {
  const {
    className,
    children,
    column
  } = props;

  const classes = clsx(className, 'cell');

  return (
    <div className={classes} style={{ width: column.width, flexBasis: column.width }}>
      {children}
    </div>
  );
};

VirtualizedTableFilterCell.displayName = 'VirtualizedTableFilterCell';

export { VirtualizedTableFilterCell };


/* --------
 * Loader Element
 * -------- */
const VirtualizedTableLoader: React.FunctionComponent = () => {

  const {
    loaderProps
  } = useVirtualizedTable();

  return (
    <Box py={4}>
      {Loader.create({
        centered: true,
        active  : true,
        size    : 'large',
        type    : 'dots',
        content : 'Loading Data',
        ...loaderProps
      }, {
        autoGenerateKey: false
      })}
    </Box>
  );
};

VirtualizedTableLoader.displayName = 'VirtualizedTableLoader';

export { VirtualizedTableLoader };


/* --------
 * No Content Element
 * -------- */
const VirtualizedTableNoContent: React.FunctionComponent = () => {

  const {
    data,
    noDataEmptyContentProps,
    noFilteredDataEmptyContentProps
  } = useVirtualizedTable();

  if (!data.length) {
    return EmptyContent.create(noDataEmptyContentProps ?? {
      header : 'No Data',
      content: 'No data to show'
    }, {
      autoGenerateKey: false
    });
  }

  return EmptyContent.create(noFilteredDataEmptyContentProps ?? {
    header : 'No Data to Show',
    content: 'No data to show for current filters'
  }, {
    autoGenerateKey: false
  });
};

VirtualizedTableNoContent.displayName = 'VirtualizedTableNoContent';

export { VirtualizedTableNoContent };
