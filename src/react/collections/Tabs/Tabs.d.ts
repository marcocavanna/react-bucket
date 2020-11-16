import * as React from 'react'

import { ReactBucketCOLUMNWIDTH, ReactBucketShorthandItem } from '../../generic';
import { LayoutProps } from '../Layout';
import { MenuProps } from '../Menu';
import { MenuItemProps } from '../Menu/MenuItem';

import TabPanel from './TabPanel';

interface LayoutTabsProps extends LayoutProps {
  panelWidth?: ReactBucketCOLUMNWIDTH
  menuWidth?: ReactBucketCOLUMNWIDTH
}

export interface TabsProps extends StrictTabsProps {
  [key: string]: any
}

export interface StrictTabsProps {
  /** The index of the current active tab */
  activeIndex?: string | number

  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** The initial active index */
  defaultActiveIndex?: string | number

  /** Grid Options */
  layout?: LayoutTabsProps

  /** Menu Props */
  menu?: MenuProps

  /** On Tab Change Handler */
  onTabChange?: (e: React.SyntheticEvent, props: TabsProps) => void

  /** Panels Array */
  panels?: Array<{ trigger: ReactBucketShorthandItem<MenuItemProps>, panel: React.ReactNode }>

  /** Render only the current active tab */
  renderActiveOnly?: boolean
}

interface TabsComponent extends React.StatelessComponent<TabsProps> {
  Panel: typeof TabPanel
}

declare const Tabs: TabsComponent

export default Tabs
