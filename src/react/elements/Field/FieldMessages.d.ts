import * as React from 'react'

export interface FieldMessagesProps extends StrictFieldMessagesProps {
  [key: string]: any
}

export interface StrictFieldMessagesProps {
  /** Messages to show */
  content?: React.ReactNode
}

interface FieldMessagesComponent extends React.StatelessComponent<FieldMessagesProps> { }

declare const FieldMessages: FieldMessagesComponent

export default FieldMessages
