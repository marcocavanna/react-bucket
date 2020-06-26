import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useSharedClassName,
  useElementType
} from '../../lib';

import { PanelFooterProps } from './PanelFooter.types';


export default function PanelFooter(props: PanelFooterProps): React.ReactElement<PanelFooterProps> {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(PanelFooter, props);

  const classes = clsx(
    'foot',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

PanelFooter.displayName = 'PanelFooter';

PanelFooter.create = createShorthandFactory(PanelFooter, (content) => ({ content }));
