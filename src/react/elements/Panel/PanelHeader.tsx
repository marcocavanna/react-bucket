import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { Header } from '../Header';

import { PanelHeaderProps } from './PanelHeader.types';


export default function PanelHeader(props: PanelHeaderProps): React.ReactElement<PanelHeaderProps> {

  const {
    className,
    rest: {
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

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const headerElement = React.useMemo(
    () => Header.create({
      content,
      subheader,
      icon,
      divided,
      disabled
    }, { autoGenerateKey: false }),
    [ content, subheader, icon ]
  );

  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
    </ElementType>
  );

}

PanelHeader.create = createShorthandFactory(PanelHeader, (content) => ({ content }));
