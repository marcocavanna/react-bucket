import * as React from 'react'

import TableCell from '../../collections/Table/TableCell';
import RxTableHeader from './RxTableHeader';
import RxTableFilterInput from './RxTableFilterInput';
import RxTablePaginationWalker from './RxTablePaginationWalker';

import RxTableData from './RxTableData';

export interface RxTableProps extends StrictRxTableProps {
  [key: string]: any
}

export interface StrictRxTableProps {
  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Error Component that will be show if an error occured while loading data */
  error?: React.ReactNode

  /** Loader Component that will be show while loading data */
  loader?: React.ReactNode

  /** Component that will be show if data is empty */
  noData?: React.ReactNode

  /** Component that will be show if search result in no data found */
  noFound?: React.ReactNode

  /** Enable data pagination */
  paginate?: boolean | number

  /** RxTableData Instance */
  rxTableData: RxTableData<any>

  /** Tools Column Position */
  toolsColumnPosition?: 'left' | 'right'

  /** Use React Virtualized to show Data [Currenty not Supported] */
  virtualizeTable?: boolean
}

interface RxTableComponent extends React.ComponentClass<RxTableProps> {
  Cell: typeof TableCell
  Header: typeof RxTableHeader
  FilterInput: typeof RxTableFilterInput
  PaginationWalker: typeof RxTablePaginationWalker
}

declare const RxTable: RxTableComponent

export default RxTable
