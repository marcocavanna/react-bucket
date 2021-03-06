import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { TabPanelProps } from './TabPanel.types';


/* --------
 * Component Declare
 * -------- */
type TabPanelComponent = CreatableFunctionComponent<TabPanelProps>;


/* --------
 * Component Render
 * -------- */
const TabPanel: TabPanelComponent = (receivedProps) => {

  const props = useWithDefaultProps('tabPanel', receivedProps);

  const {
    className,
    rest: {
      active,
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(TabPanel, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    { active },
    'tab-panel',
    className
  );

  /** If children are declared, render them */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {content}
    </ElementType>
  );
};

TabPanel.displayName = 'TabPanel';

TabPanel.create = createShorthandFactory(TabPanel, (content) => ({ content }));

export default TabPanel;
