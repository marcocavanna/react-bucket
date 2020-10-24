import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils,
  isBrowser as checkIsBrowser,
  Portal
} from '@appbuckets/react-ui-core';

import { Loader } from '../../elements/Loader';

import BackdropInner from './BackdropInner';

import { BackdropProps } from './Backdrop.types';
import { BackdropInnerProps } from './BackdropInner.types';


export default function Backdrop(props: BackdropProps): React.ReactElement<BackdropProps> | React.ReactElement<BackdropInnerProps> {

  // ----
  // Get Backdrop Props
  // ----
  const {
    /** Backdrop Props */
    className,
    closeOnBackdropClick,
    children,
    content,
    loading,
    loaderProps,
    page,
    visible,

    /** Handled Portal Props */
    closeOnDocumentClick,
    closeOnEscape,
    onClose,
    onMount,
    onOpen,
    onUnmount,
    openOnTriggerClick,
    openOnTriggerFocus,
    openOnTriggerMouseEnter,
    trigger,
    triggerRef,

    /** OnClick must be stripped to rest props passed down to Backdrop Inner */
    onClick,

    /** All other Props */
    ...rest
  } = props;

  /** Check if code is running on browser */
  const isBrowser = React.useMemo(
    () => checkIsBrowser(),
    [ checkIsBrowser ]
  );


  // ----
  // Define Backdrop Handlers
  // ----
  const handlePortalMount = React.useCallback(
    () => {
      if (isBrowser) {
        document.body.classList.add('dimmable');
        document.body.classList.add('dimmed');
      }

      if (onMount) {
        onMount(null, props);
      }
    },
    [ isBrowser, onMount ]
  );

  const handlePortalUnmount = React.useCallback(
    () => {
      if (isBrowser) {
        document.body.classList.remove('dimmable');
        document.body.classList.remove('dimmed');
      }

      if (onUnmount) {
        onUnmount(null, props);
      }
    },
    [ isBrowser, onUnmount ]
  );

  const handlePortalOpen = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (onOpen) {
        onOpen(e, props);
      }
    },
    [ visible, onOpen ]
  );

  const handlePortalClose = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (onClose) {
        onClose(e, props);
      }
    },
    [ onClose ]
  );

  const handleOutsideContentClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (visible && closeOnBackdropClick) {
        handlePortalClose(e);
      }
    },
    [ visible, closeOnBackdropClick, handlePortalClose ]
  );


  // ----
  // Define Classes
  // ----
  const innerClasses = clsx(
    className,
    { loading, page }
  );


  // ----
  // Memoized Elements
  // ----
  const innerContent = React.useMemo<React.ReactElement<BackdropInnerProps>>(
    () => (
      <BackdropInner
        {...rest}
        className={innerClasses}
        visible={visible}
        onClickOutside={handleOutsideContentClick}
      >
        {loading
          ? Loader.create(
            { appearance: 'white', size: 'big', centered: true, ...loaderProps },
            { autoGenerateKey: false }
          )
          : (childrenUtils.isNil(children) ? content : children)}
      </BackdropInner>
    ),
    [ loading, children, content, visible, page ]
  );

  /** Return the Dimmer */
  if (page) {
    return (
      <Portal
        closeOnEscape={closeOnEscape}
        closeOnDocumentClick={closeOnDocumentClick}
        open={visible}
        openOnTriggerClick={openOnTriggerClick}
        openOnTriggerMouseEnter={openOnTriggerMouseEnter}
        openOnTriggerFocus={openOnTriggerFocus}
        trigger={trigger}
        triggerRef={triggerRef}
        onClose={handlePortalClose}
        onOpen={handlePortalOpen}
        onMount={handlePortalMount}
        onUnmount={handlePortalUnmount}
      >
        {innerContent}
      </Portal>
    );
  }

  /** Else, return the Backdrop Inner Content */
  return innerContent;
}

/** Properly set the Display Name */
Backdrop.displayName = 'Backdrop';

/** Append Child Component */
Backdrop.Inner = BackdropInner;

/** Backdrop could be created using shorthand */
Backdrop.create = createShorthandFactory(Backdrop, (content) => ({ content }));
