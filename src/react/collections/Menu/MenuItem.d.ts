import * as React from 'react'

import { AppBucketsCOLORS } from '../../generic';
import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon';

export interface MenuHeaderProps extends StrictMenuHeaderProps {
  [key: string]: any
}

export interface StrictMenuHeaderProps {
  /** Display as Active */
  active: boolean | AppBucketsCOLORS,

  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Custom Color */
  color: AppBucketsCOLORS,

  /** Content ShordHand */
  content: any,

  /** Disabled State */
  disabled: boolean,

  /** Header Style */
  header: boolean,

  /** Icon */
  icon: boolean | AppBucketsICON,

  /** Name Shorthand */
  name: string,

  /** OnClick Handler */
  onClick: Function,

  /** On Right Position */
  right: boolean

}

declare class MenuHeader extends React.Component<MenuHeaderProps, {}> { }

export default MenuHeader