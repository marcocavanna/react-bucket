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

import { Button } from '../Button';
import { Header } from '../Header';

import { EmptyContentProps } from './EmptyContent.types';


/* --------
 * Component Declare
 * -------- */
type EmptyContentComponent = CreatableFunctionComponent<EmptyContentProps>;


/* --------
 * Component Render
 * -------- */
const EmptyContent: EmptyContentComponent = (receivedProps) => {

  /** Get component props */
  const props = useWithDefaultProps('emptyContent', receivedProps);

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

  const ElementType = useElementType(EmptyContent, receivedProps, props);

  const buttonElement = React.useMemo(
    () => Button.create(button, { autoGenerateKey: false }),
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
      {buttonElement}
    </ElementType>
  );

};

EmptyContent.displayName = 'EmptyContent';

EmptyContent.create = createShorthandFactory(
  EmptyContent,
  (header) => ({ header })
);

export default EmptyContent;
