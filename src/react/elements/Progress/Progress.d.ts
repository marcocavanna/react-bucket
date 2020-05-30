import * as React from 'react'

import { ReactBucketSIZE } from '../../generic';

export interface ProgressProps extends StrictProgressProps {
  [key: string]: any
}

export interface StrictProgressProps {
  /** Show an Active White Shadow */
  active?: boolean

  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** Draw Circular Progress */
  circular?: boolean

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Set Progress Direction */
  direction?: 'left' | 'right'

  /** A discrete Progress is uncolored */
  discrete?: boolean

  /** Manually Set the Error Color */
  error?: boolean

  /** Format Limits */
  formatLimits: (limit: number) => React.ReactNode

  /** Show or not Progress Indicator */
  indicator?: boolean | 'percent' | 'steps' | ((value: number) => React.ReactNode)

  /** Invert the Bar Color logic, max value will be danger colored */
  inverted?: boolean

  /** Show Progress Limit */
  limits?: boolean | { high: string, low: string }

  /** Set Maximum progress value */
  max?: number

  /** Set Minimum progress value */
  min?: number

  /** Size Variation */
  size?: ReactBucketSIZE

  /** Set Success Style */
  success?: boolean

  /** Set the Progress value */
  value?: number

  /** Manually Set Warning Color */
  warning?: number
}

declare const Progress: React.FunctionComponent<ProgressProps>

export default Progress
