import * as React from 'react'

import {
  ReactBucketALIGN,
  ReactBucketVERTICALALIGN,
  ReactBucketICON
} from '../../generic'

export interface TableCellProps extends StrictTableCellProps {
  [key: string]: any
}

export interface StrictTableCellProps {
  /** Set the Cell as Action Container */
  action?: boolean

  /** Set the Cell as Active */
  active?: boolean

  /** An Element used to Render the Component */
  as?: React.ElementType

  /** User Defined Class */
  className?: string

  /** Cell content Shorthand */
  content?: React.ReactNode

  /** Disable Cell */
  disabled?: boolean

  /** Cell Error Style */
  error?: boolean

  /** Cell Header Shorthand */
  header?: React.ReactNode

  /** Icon Shorthand */
  icon?: ReactBucketICON

  /** Metadata Element Shorthand */
  metadata?: React.ReactNode

  /** Set cell as Selectable */
  selectable?: boolean

  /** Set cell as Success */
  success?: boolean

  /** Set Text align */
  textAlign?: ReactBucketALIGN

  /** Set Cell Vertical Align */
  verticalAlign?: ReactBucketVERTICALALIGN

  /** Set Cell as Warning */
  warning?: boolean

  /** Set Cell Width */
  width?: number | 'auto';
}

interface TableCellComponent extends React.StatelessComponent<TableCellProps> { }

declare const TableCell: TableCellComponent

export default TableCell
