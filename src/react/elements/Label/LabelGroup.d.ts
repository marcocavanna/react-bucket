import * as React from 'react'

import { AppBucketsSIZE } from '../../generic'

export interface LabelGroupProps extends StrictLabelGroupProps {
  [key: string]: any
}

export interface StrictLabelGroupProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content ShortHand */
  content?: React.ReactNode,

  /** Size */
  size?: AppBucketsSIZE

}

interface LabelGroupComponent extends React.StatelessComponent<LabelGroupProps> { }
/** In case of subcomponent append Name: typeof ImportedComponent in the interface */

declare const LabelGroup: LabelGroupComponent

export default LabelGroup
