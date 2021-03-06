import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils,
  isBrowser as checkIsBrowser,
  Portal
} from '@appbuckets/react-ui-core';

import { useWithDefaultProps } from '../../context/BucketContext';

import { Loader } from '../../elements/Loader';
import { CreatableFunctionComponent } from '../../generic';

import BackdropInner from './BackdropInner';

import { BackdropProps } from './Backdrop.types';


/* --------
 * Component Declare
 * -------- */
type BackdropComponent = CreatableFunctionComponent<BackdropProps> & {
  Inner: typeof BackdropInner
};


/* --------
 * Component Render
 * -------- */
const Backdrop: BackdropComponent = (receivedProps) => {

  const props = useWithDefaultProps('backdrop', receivedProps);

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
    []
  );


  // ----
  // Check if this is a nested backdrop.
  // Nested backdrop must not change body classList
  // Change is demanded to primary backdrop
  // ----
  const [ isNestedBackdrop ] = React.useState(document.body.classList.contains('dimmed'));


  // ----
  // Define Backdrop Handlers
  // ----
  const handlePortalMount = () => {
    /** Set document class only if this is the first backdrop */
    if (isBrowser && !isNestedBackdrop) {
      document.body.classList.add('dimmable');
      document.body.classList.add('dimmed');
    }

    if (onMount) {
      onMount(null, props);
    }
  };

  const handlePortalUnmount = () => {
    /** Remove Document class only if this is the last backdrop */
    if (isBrowser && !isNestedBackdrop) {
      document.body.classList.remove('dimmable');
      document.body.classList.remove('dimmed');
    }

    if (onUnmount) {
      onUnmount(null, props);
    }
  };

  const handlePortalOpen = (e: React.MouseEvent<HTMLElement>) => {
    if (onOpen) {
      onOpen(e, props);
    }
  };

  const handlePortalClose = (e: React.MouseEvent<HTMLElement>) => {
    if (onClose) {
      onClose(e, props);
    }
  };

  const handleOutsideContentClick = (e: React.MouseEvent<HTMLElement>) => {
    if (visible && closeOnBackdropClick) {
      handlePortalClose(e);
    }
  };


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
  const innerContent = (
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
};

/** Properly set the Display Name */
Backdrop.displayName = 'Backdrop';

/** Append Child Component */
Backdrop.Inner = BackdropInner;

/** Backdrop could be created using shorthand */
Backdrop.create = createShorthandFactory(Backdrop, (content) => ({ content }));

export default Backdrop;
