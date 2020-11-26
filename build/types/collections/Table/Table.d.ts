import * as React from 'react';
import { TableProps } from './Table.types';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';
declare type TableComponent = React.FunctionComponent<TableProps> & {
  Body: typeof TableBody;
  Cell: typeof TableCell;
  Footer: typeof TableFooter;
  Header: typeof TableHeader;
  HeaderCell: typeof TableHeaderCell;
  Row: typeof TableRow;
};
declare const Table: TableComponent;
export default Table;
