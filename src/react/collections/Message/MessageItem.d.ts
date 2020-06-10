import * as React from 'react'

export interface MessageItemProps extends StrictMessageItemProps {
  [key: string]: any
}

export interface StrictMessageItemProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: React.ReactNode
}

declare const MessageItem: React.StatelessComponent<MessageItemProps>

export default MessageItem