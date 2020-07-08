import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { Button } from '../Button';
import { Header } from '../Header';

import { EmptyContentProps } from './EmptyContent.types';


export default function EmptyContent(props: EmptyContentProps): React.ReactElement<EmptyContentProps> {

  const {
    className,
    rest: {
      children,
      content,
      button,
      header,
      icon,
      ...rest
    }
  } = useSharedClassName(props);

  const classes = clsx(
    'empty',
    className
  );

  const ElementType = useElementType(EmptyContent, props);

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const buttonElement = React.useMemo(
    () => button && Button.create(button, { autoGenerateKey: false }),
    [ button ]
  );

  const headerElement = React.useMemo(
    () => (header || content || icon) && Header.create({
      content  : header,
      subheader: content,
      icon
    }, {
      autoGenerateKey: false,
      overrideProps  : {
        textAlign: 'center'
      }
    }),
    [
      header,
      content,
      icon
    ]
  );

  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
      {buttonElement}
    </ElementType>
  );

}

EmptyContent.displayName = 'EmptyContent';

EmptyContent.create = createShorthandFactory(EmptyContent, (header) => ({ header }));
