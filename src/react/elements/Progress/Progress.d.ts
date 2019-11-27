import * as React from 'react'

import { AppBucketsSIZE } from '../../generic';

import { FieldProps } from '../Field';

export interface ProgressProps extends StrictProgressProps {
  [key: string]: any
}

export interface StrictProgressProps extends FieldProps {
  /** Show an Active White Shadow */
  active?: boolean,

  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Set Progress Direction */
  direction?: 'left' | 'right'

  /** A discrete Progress is uncolored */
  discrete?: boolean

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
  size?: AppBucketsSIZE

  /** Set the Progress value */
  value?: number
}

interface ProgressComponent extends React.StatelessComponent<ProgressProps> { }

declare const Progress: ProgressComponent

export default Progress
