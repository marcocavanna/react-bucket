import * as React from 'react';

import Subheader, { HeaderSubheaderProps } from './HeaderSubheader'
import Content from './HeaderContent'

import { ReactBucketCOLOR, ReactBucketALIGN, ReactBucketICON, ReactBucketShorthandItem } from '../../generic'

import { ImageProps } from '../Image';

export interface HeaderProps extends StrictHeaderProps {
  [key: string]: any
}

export interface StrictHeaderProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Custom Font Color */
  color?: ReactBucketCOLOR

  /** Content shorthand */
  content?: React.ReactNode

  /** Disable Header */
  disabled?: boolean

  /** Dividing Header */
  dividing?: boolean

  /** Icon Item */
  icon?: ReactBucketICON

  /** Image Item */
  image?: ReactBucketShorthandItem<ImageProps>

  /** Subheader shorthand */
  subheader?: ReactBucketShorthandItem<HeaderSubheaderProps>

  /** Text Alignment */
  textAlign?: ReactBucketALIGN
}

interface HeaderComponent extends React.FunctionComponent<HeaderProps> {
  Subheader: typeof Subheader
  Content: typeof Content
}

declare const Header: HeaderComponent

export default Header
