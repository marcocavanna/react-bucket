import * as React from 'react'

import { ReactBucketSIZE } from '../../generic'

export interface LabelGroupProps extends StrictLabelGroupProps {
  [key: string]: any
}

export interface StrictLabelGroupProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content ShortHand */
  content?: React.ReactNode

  /** Size */
  size?: ReactBucketSIZE

}

declare const LabelGroup: React.FunctionComponent<LabelGroupProps>

export default LabelGroup
