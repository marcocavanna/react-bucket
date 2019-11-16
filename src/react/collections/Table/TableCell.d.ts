import * as React from 'react'

import {
  AppBucketsALIGN,
  AppBucketsVERTICALALIGN
} from '../../generic'

import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon';

export interface TableCellProps extends StrictTableCellProps {
  [key: string]: any
}

export interface StrictTableCellProps {
  /** Set the Cell as Active */
  active?: boolean,

  /** An Element used to Render the Component */
  as?: any,

  /** User Defined Class */
  className?: string,

  /** Cell content Shorthand */
  content?: any,

  /** Disable Cell */
  disabled?: boolean,

  /** Cell Error Style */
  error?: boolean,

  /** Icon Shorthand */
  icon?: AppBucketsICON,

  /** Set cell as Selectable */
  selectable?: boolean,

  /** Set cell as Success */
  success?: boolean,

  /** Set Text align */
  textAlign?: AppBucketsALIGN,

  /** Set Cell Vertical Align */
  verticalAlign?: AppBucketsVERTICALALIGN,

  /** Set Cell as Warning */
  warning?: boolean
}

interface TableCellComponent extends React.StatelessComponent<TableCellProps> { }

declare const TableCell: TableCellComponent

export default TableCell
