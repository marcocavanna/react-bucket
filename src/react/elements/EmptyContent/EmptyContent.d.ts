import * as React from 'react'

import { AppBucketsALIGN, AppBucketsCOLORS } from '../../generic';
import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon';

import { StrictContainerProps } from '../Container';

export interface EmptyContentProps extends StrictEmptyContentProps {
  [key: string]: any
}

export interface StrictEmptyContentProps extends StrictContainerProps {
  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Text Color */
  color?: AppBucketsCOLORS

  /** Content Shorthand */
  content?: React.ReactNode

  /** Header content */
  header?: string

  /** Icon to Show */
  icon?: AppBucketsICON

  /** Text Align */
  textAlign?: AppBucketsALIGN
}

interface EmptyContentComponent extends React.StatelessComponent<EmptyContentProps> { }

declare const EmptyContent: EmptyContentComponent

export default EmptyContent
