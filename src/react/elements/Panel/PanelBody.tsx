import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  classByKey,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { PanelBodyProps } from './PanelBody.types';

import { Button } from '../Button';


export default function PanelBody(props: PanelBodyProps): React.ReactElement<PanelBodyProps> {

  const {
    className,
    rest: {
      children,
      content,
      fab,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(PanelBody, props);

  const classes = clsx(
    'body',
    classByKey(Array.isArray(fab) && fab.length, 'with-fab'),
    className
  );

  /** Build Fab Buttons */
  const fabButtons = React.useMemo(
    () => Array.isArray(fab)
      ? fab.map((buttonProps) => Button.create(buttonProps, { autoGenerateKey: true, overrideProps: { fab: true } }))
      : [],
    [ fab ]
  );

  const fabsElement = !!fabButtons.length && (
    <div className={'fabs'}>
      {fabButtons}
    </div>
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
      {fabsElement}
    </ElementType>
  );

}

PanelBody.displayName = 'PanelBody';

PanelBody.create = createShorthandFactory(PanelBody, (content) => ({ content }));
