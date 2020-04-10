import * as React from 'react'
import { ReactBucketShorthandItem } from '../../generic'
import { MessageHeaderProps } from './MessageHeader'
import { MessageListProps } from './MessageList'

export interface MessageContentProps extends StrictMessageContentProps {
  [key: string]: any
}

export interface StrictMessageContentProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: React.ReactNode,

  /** Header Shorthand Props */
  header?: ReactBucketShorthandItem<MessageHeaderProps>

  /** List Shorthand Props */
  list?: ReactBucketShorthandItem<MessageListProps>
}

declare const MessageContent: React.StatelessComponent<MessageContentProps>

export default MessageContent
