import * as React from 'react';

import { ReactBucketCOLOR, ReactBucketSIZE, ReactBucketICON } from '../../generic'

export interface IconProps extends StrictIconProps {
  [key: string]: any
}

export interface StrictIconProps {
  /** An element used to render */
  as?: React.ElementType

  /** Display Icon Border */
  bordered?: boolean

  /** User defined class */
  className?: string

  /** Icon Color */
  color?: ReactBucketCOLOR

  /** Set icon as disabled */
  disabled?: boolean

  /** Fitted Icon has no Margin and Auto Width */
  fitted?: boolean

  /** Flip an Icon */
  flip?: 'horizontal' | 'vertical' | 'both'

  /** Icon as Link */
  link?: boolean

  /** Icon Name */
  name?: ReactBucketICON

  /** OnClick Handler */
  onClick?: Function

  /** Rotate Icon */
  rotate?: 90 | 180 | 270 | '90' | '180' | '270'

  /** Icon Size */
  size?: ReactBucketSIZE

  /** Animate an Icon using Spin */
  spin?: boolean

  /** Icon Style */
  style?: 'brand' | 'light' | 'regular' | 'solid'
}

declare class Icon extends React.PureComponent<IconProps, {}> {

}

export default Icon
