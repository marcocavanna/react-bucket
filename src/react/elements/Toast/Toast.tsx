import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { Header } from '../Header';
import { Icon } from '../Icon';

import { ToastProps } from './Toast.types';


export default function Toast(props: ToastProps): React.ReactElement<ToastProps> {

  const {
    className,
    rest: {
      children,
      content,
      dismiss,
      dismissible,
      header,
      icon,
      onClick,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** get the Element Type */
  const ElementType = useElementType(Toast, props);

  /** Split state className from rest props */
  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);

  /** Build classname */
  const classes = clsx(
    'toast',
    stateClassName,
    className
  );

  /** Build Handlers */
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof onClick === 'function') {
        onClick(e, props);
      }
    },
    [ onClick ]
  );

  const handleDismiss = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      /** Stop the Main Propagation of event */
      e.stopPropagation();

      if (typeof dismiss === 'function') {
        dismiss();
      }
    },
    [ dismissible, dismiss ]
  );


  /* --------
   * If element has children, render them
   * -------- */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick}>
        {typeof children === 'function' ? children({ dismiss: handleDismiss }) : children}
      </ElementType>
    );
  }


  /* --------
   * Build the Toast Content using Shorthand
   * -------- */
  const toastContent = React.useMemo(
    () => Header.create({
      header,
      content,
      icon
    }, { autoGenerateKey: false }),
    [ header, content, icon ]
  );

  const dismissIcon = React.useMemo(
    () => dismissible && (typeof dismissible === 'boolean'
      ? Icon.create({ name: 'times', onClick: handleDismiss }, { autoGenerateKey: false })
      : Icon.create(dismissible, {
        autoGenerateKey: false,
        overrideProps  : {
          onClick: handleDismiss
        }
      })),
    [ dismissible, handleDismiss ]
  );


  /* --------
   * Render the Component
   * -------- */
  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {toastContent}
      {dismissIcon}
    </ElementType>
  );
}

Toast.displayName = 'Toast';
