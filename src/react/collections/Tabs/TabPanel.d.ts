import * as React from 'react'

export interface TabPanelProps extends StrictTabPanelProps {
  [key: string]: any
}

export interface StrictTabPanelProps {
  /** Set the Tab as Active */
  active?: boolean

  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content shorthand */
  content?: React.ReactNode

  /** Loading state for tab panel */
  loading: boolean
}

interface TabPanelComponent extends React.StatelessComponent<TabPanelProps> { }

declare const TabPanel: TabPanelComponent

export default TabPanel
