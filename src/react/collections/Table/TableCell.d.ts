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

  /** Icon Shorthand */
  icon?: ReactBucketICON

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
}

interface TableCellComponent extends React.StatelessComponent<TableCellProps> { }

declare const TableCell: TableCellComponent

export default TableCell
