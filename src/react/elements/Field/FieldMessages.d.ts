import * as React from 'react'

export interface FieldMessagesProps extends StrictFieldMessagesProps {
  [key: string]: any
}

export interface StrictFieldMessagesProps {
  /** Messages to show */
  content?: React.ReactNode[]
}

declare const FieldMessages: React.FunctionComponent<FieldMessagesProps>

export default FieldMessages
