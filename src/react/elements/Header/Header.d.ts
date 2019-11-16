import * as React from 'react';

import Subheader from './HeaderSubheader'
import Content from './HeaderContent'

import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon'
import { AppBucketsCOLORS, AppBucketsALIGN, AppBucketsRESPONSIVE, AppBucketsFONTWEIGHT } from '../../generic'

export interface HeaderProps extends StrictHeaderProps {
  [key: string]: any
}

export interface StrictHeaderProps {
  /** An element used to render */
  as?: any,

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Custom Font Color */
  color?: AppBucketsCOLORS,

  /** Content shorthand */
  content?: React.ReactNode,

  /** Disable Header */
  disabled?: boolean,

  /** Dividing Header */
  dividing?: boolean,

  /** Icon Item */
  icon?: AppBucketsICON,

  /** Image Item */
  image?: any,

  /** Subheader shorthand */
  subheader?: any,

  /** Text Alignment */
  textAlign?: AppBucketsALIGN,
}

interface HeaderComponent extends React.StatelessComponent<HeaderProps> {
  Subheader: typeof Subheader,
  Content: typeof Content
}

declare const Header: HeaderComponent

export default Header
