import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';
import { CreatableFunctionComponent } from '../../generic';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { useWithDefaultProps } from '../../context/BucketContext';

import { Header } from '../Header';

import { PanelHeaderProps } from './PanelHeader.types';


/* --------
 * Component Declare
 * -------- */
type PanelHeaderComponent = CreatableFunctionComponent<PanelHeaderProps>;

/* --------
 * Component Render
 * -------- */
const PanelHeader: PanelHeaderComponent = (receivedProps) => {

  const props = useWithDefaultProps('panelHeader', receivedProps);

  const {
    className,
    rest: {
      actions,
      children,
      content,
      subheader,
      icon,
      disabled,
      divided,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(PanelHeader, props);

  const classes = clsx(
    'head',
    className
  );

  const headerElement = React.useMemo(
    () => Header.create({
      actions,
      content,
      subheader,
      icon,
      divided,
      disabled
    }, { autoGenerateKey: false }),
    [ actions, content, subheader, icon, divided, disabled ]
  );

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
    </ElementType>
  );

};

PanelHeader.displayName = 'PanelHeader';

PanelHeader.create = createShorthandFactory(PanelHeader, (content) => ({ content }));

export default PanelHeader;
