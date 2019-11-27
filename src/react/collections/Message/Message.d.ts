import * as React from 'react'

import {
  ReactBucketShorthandItem,
  ReactBucketSIZE,
  ReactBucketICON
} from '../../generic'

import MessageContent from './MessageContent'
import { default as MessageHeader, MessageHeaderProps } from './MessageHeader'
import { default as MessageItem, MessageItemProps } from './MessageItem'
import MessageList from './MessageList'

export interface MessageProps extends StrictMessageProps {
  [key: string]: any
}

export interface StrictMessageProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: React.ReactNode

  /** A message may be formatted to display a negative message. Same as `negative`. */
  error?: boolean

  /** Shorthand for MessageHeader. */
  header?: ReactBucketShorthandItem<MessageHeaderProps>

  /** Add an icon by icon name or pass an <Icon /.> */
  icon?: ReactBucketICON | boolean

  /** A message may be formatted to display information. */
  info?: boolean

  /** Array shorthand items for the MessageList. Mutually exclusive with children. */
  list?: MessageItemProps[]

  /**
   * A message that the user can choose to hide.
   * Called when the user clicks the "x" icon. This also adds the "x" icon.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onDismiss?: (event: React.MouseEvent<HTMLElement>, data: MessageProps) => void

  /** Primary Color */
  primary?: boolean

  /** Secondary Color */
  secondary?: boolean

  /** A message can have different sizes. */
  size?: ReactBucketSIZE

  /** A message may be formatted to display a positive message.  Same as `positive`. */
  success?: boolean

  /** A message may be formatted to display warning messages. */
  warning?: boolean
}

interface MessageComponent extends React.ComponentClass<MessageProps> {
  Content: typeof MessageContent
  Header: typeof MessageHeader
  List: typeof MessageList
  Item: typeof MessageItem
}

declare const Message: MessageComponent

export default Message
