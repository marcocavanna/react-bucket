import * as React from 'react'

import { MessageItemProps } from './MessageItem'

export interface MessageListProps extends StrictMessageListProps {
  [key: string]: any
}

export interface StrictMessageListProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand Message.Items. */
  items?: MessageItemProps[]
}

declare const MessageList: React.StatelessComponent<MessageListProps>

export default MessageList