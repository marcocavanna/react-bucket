import * as React from 'react'
import { AppBucketsShorthandContent } from '../../generic'

export interface MessageContentProps extends StrictMessageContentProps {
  [key: string]: any
}

export interface StrictMessageContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode,

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: React.ReactNode,
}

declare const MessageContent: React.StatelessComponent<MessageContentProps>

export default MessageContent
