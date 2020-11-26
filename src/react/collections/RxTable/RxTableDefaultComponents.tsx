import * as React from 'react';

import { Box } from '../../elements/Box';
import { EmptyContent } from '../../elements/EmptyContent';
import { Loader } from '../../elements/Loader';

import { Message } from '../Message';
import TableCell from '../Table/TableCell';

import TableHeaderCell from '../Table/TableHeaderCell';
import TableRow from '../Table/TableRow';
import { useRxTable } from './RxTable.context';

import {
  RxTableCellComponent,
  RxTableErrorComponent,
  RxTableFilterCellComponent,
  RxTableHeaderCellComponent,
  RxTableRowComponent
} from './RxTable.types';


/* --------
 * Table Header Cell
 * -------- */
const RxTableHeaderCell: RxTableHeaderCellComponent = (props) => {
  const {
    className,
    content,
    hasSorting,
    isActualSortingColumn,
    isReversedSorting,
    onClick
  } = props;

  return TableHeaderCell.create(content, {
    autoGenerateKey: false,
    defaultProps   : {
      className
    },
    overrideProps  : (defaultProps) => ({
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
      }
    })
  });
};

RxTableHeaderCell.displayName = 'RxTableHeaderCell';

export { RxTableHeaderCell };


/* --------
 * Table Body Row Component
 * -------- */
const RxTableBodyRow: RxTableRowComponent<any> = (
  props
) => {

  const {
    children,
    className,
    onClick
  } = props;

  return (
    <TableRow className={className} onClick={onClick}>
      {children}
    </TableRow>
  );
};

RxTableBodyRow.displayName = 'RxTableBodyRow';

export { RxTableBodyRow };


/* --------
 * Table Cell Component
 * -------- */
const RxTableBodyCell: RxTableCellComponent<any> = (
  props
) => {

  const {
    className,
    column,
    data,
    index,
    row
  } = props;

  /** Render the Cell with function if exists */
  if (typeof column.render === 'function') {
    return (
      <TableCell className={className}>
        {column.render(row, index, data)}
      </TableCell>
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
      <TableCell
        className={className}
        header={headerContent}
        meta={metaContent}
        content={contentContent}
      />
    );
  }

  /** Render using the key */
  return (
    <TableCell
      header={row[column.key]}
      className={className}
    />
  );
};

RxTableBodyCell.displayName = 'RxTableBodyCell';

export { RxTableBodyCell };


/* --------
 * Table Filter Cell
 * -------- */
const RxTableFilterCell: RxTableFilterCellComponent = (props) => {
  const {
    className,
    children
  } = props;

  return (
    <TableHeaderCell className={className}>
      {children}
    </TableHeaderCell>
  );
};

RxTableFilterCell.displayName = 'RxTableFilterCell';

export { RxTableFilterCell };


/* --------
 * Loader Element
 * -------- */
const RxTableLoader: React.FunctionComponent = () => (
  <Box py={4}>
    <Loader
      centered
      active={true}
      size={'large'}
      type={'dots'}
      content={'Loading Data'}
    />
  </Box>
);

RxTableLoader.displayName = 'RxTableLoader';

export { RxTableLoader };


/* --------
 * Error Element
 * -------- */
const RxTableError: RxTableErrorComponent = () => (
  <Message
    danger
    header={'An error occurred while loading data'}
  />
);

RxTableError.displayName = 'RxTableError';

export { RxTableError };


/* --------
 * No Content Element
 * -------- */
const RxTableNoContent: React.FunctionComponent = () => {

  const {
    data
  } = useRxTable();

  if (!data.length) {
    return (
      <EmptyContent
        header={'No Data'}
        content={'No data to show'}
      />
    );
  }

  return (
    <EmptyContent
      header={'No Data to Show'}
      content={'No data to show for current filters'}
    />
  );
};

RxTableNoContent.displayName = 'RxTableNoContent';

export { RxTableNoContent };
