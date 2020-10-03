import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSplitStateClassName,
  useSharedClassName
} from '../../lib';

import { MessageProps } from './Message.types';
import { Icon } from '../../elements/Icon';
import { Header } from '../../elements/Header';


export default function Message(props: MessageProps): React.ReactElement<MessageProps> {

  const {
    className,
    rest: {
      children,
      content,
      header,
      icon,
      onDismiss,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get Proper Element type */
  const ElementType = useElementType(Message, props);

  /** Split state classNames */
  const [ stateClassNames, rest ] = useSplitStateClassName(rawRest);

  /** Build class list */
  const classes = clsx(
    typeof onDismiss === 'function' && 'dismissible',
    'message',
    stateClassNames,
    className
  );


  /* --------
   * Component Handlers
   * -------- */
  const handleDismiss = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof onDismiss === 'function') {
        onDismiss(e, props);
      }
    },
    [ onDismiss ]
  );


  /* --------
   * Internal Elements
   * -------- */
  const dismissIcon = React.useMemo(
    () => typeof onDismiss === 'function' && (
      <Icon name={'times'} className={'dismiss'} onClick={handleDismiss} />
    ),
    [ handleDismiss ]
  );

  /* --------
   * If element has children, render them
   * -------- */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {dismissIcon}
        {children}
      </ElementType>
    );
  }

  /* --------
   * Internal Content Generated
   * -------- */
  const messageContent = React.useMemo(
    () => Header.create({
      content  : header,
      subheader: content,
      icon
    }, { autoGenerateKey: false }),
    [ header, content, icon ]
  );


  /* --------
   * Render the Component
   * -------- */
  return (
    <ElementType {...rest} className={classes}>
      {dismissIcon}
      {messageContent}
    </ElementType>
  );
}

Message.displayName = 'Message';
