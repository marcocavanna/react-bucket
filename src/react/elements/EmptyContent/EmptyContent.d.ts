import * as React from 'react'

import { ReactBucketALIGN, ReactBucketCOLOR, ReactBucketICON, ReactBucketShorthandItem } from '../../generic';

import { StrictContainerProps } from '../Container';

import { ButtonProps } from '../Button';

export interface EmptyContentProps extends StrictEmptyContentProps {
  [key: string]: any
}

export interface StrictEmptyContentProps extends StrictContainerProps {
  /** Button shorthand */
  button?: ReactBucketShorthandItem<ButtonProps>

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Text Color */
  color?: ReactBucketCOLOR

  /** Content Shorthand */
  content?: React.ReactNode

  /** Header content */
  header?: string

  /** Icon to Show */
  icon?: ReactBucketICON

  /** Text Align */
  textAlign?: ReactBucketALIGN
}

declare const EmptyContent: React.FunctionComponent<EmptyContentProps>

export default EmptyContent
