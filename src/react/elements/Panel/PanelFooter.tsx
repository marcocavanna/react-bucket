import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import {
  useSharedClassName,
  useElementType
} from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { PanelFooterProps } from './PanelFooter.types';


/* --------
 * Component Declare
 * -------- */
type PanelFooterComponent = CreatableFunctionComponent<PanelFooterProps>;


/* --------
 * Component Render
 * -------- */
const PanelFooter: PanelFooterComponent = (receivedProps) => {

  const props = useWithDefaultProps('panelFooter', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(PanelFooter, receivedProps, props);

  const classes = clsx(
    'foot',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

PanelFooter.displayName = 'PanelFooter';

PanelFooter.create = createShorthandFactory(PanelFooter, (content) => ({ content }));

export default PanelFooter;
