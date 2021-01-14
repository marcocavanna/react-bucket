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


/* --------
 * Component Declare
 * -------- */
type ToastComponent = React.FunctionComponent<ToastProps>;


/* --------
 * Component Render
 * -------- */
const Toast: ToastComponent = (props) => {

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
    typeof onClick === 'function' && 'clickable',
    stateClassName,
    className
  );

  /** Build Handlers */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof onClick === 'function') {
      onClick(e, props);
    }
  };

  const handleDismiss = React.useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      /** Stop the Main Propagation of event */
      e.stopPropagation();

      if (typeof dismiss === 'function') {
        dismiss();
      }
    },
    [ dismiss ]
  );


  /* --------
   * Build the Toast Content using Shorthand
   * -------- */
  const toastContent = React.useMemo(
    () => Header.create({
      content  : header,
      subheader: content,
      icon
    }, { autoGenerateKey: false }),
    [ header, content, icon ]
  );

  const dismissIcon = React.useMemo(
    () => dismissible && (typeof dismissible === 'boolean'
      ? Icon.create({ name: 'times', onClick: handleDismiss }, {
        autoGenerateKey: false,
        defaultProps   : {
          className: 'dismiss'
        },
        overrideProps  : {
          onClick: handleDismiss
        }
      })
      : Icon.create(dismissible, {
        autoGenerateKey: false,
        defaultProps   : {
          className: 'dismiss'
        },
        overrideProps  : {
          onClick: handleDismiss
        }
      })),
    // @ts-ignore
    [ dismissible, handleDismiss ]
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
   * Render the Component
   * -------- */
  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {toastContent}
      {dismissIcon}
    </ElementType>
  );
};

Toast.displayName = 'Toast';

export default Toast;
