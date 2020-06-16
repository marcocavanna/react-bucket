import * as React from 'react';

import {
  createShorthandFactory,
  childrenUtils,
  isBrowser as checkIsBrowser, Portal
} from '@appbuckets/react-ui-core';

import { Loader } from '../../elements/Loader';

import BackdropInner from './BackdropInner';

import { BackdropProps } from './Backdrop.types';
import { BackdropInnerProps } from './BackdropInner.types';


export default function Backdrop(props: BackdropProps): React.ReactElement<BackdropProps> | React.ReactElement<BackdropInnerProps> {

  const {
    children,
    content,
    loading,
    page,
    visible,
    loaderProps,
    /** OnClick must be stripped to rest props passed down to Backdrop Inner */
    onClick,
    ...rest
  } = props;

  /** Check if code is running on browser */
  const isBrowser = checkIsBrowser();

  /** Get Inner Content */
  const innerContent = React.useMemo<React.ReactElement<BackdropInnerProps>>(
    () => (
      <BackdropInner {...rest} visible={visible} page={page}>
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


  /** Build a function to add class on body on portal mount */
  const handlePortalMount = () => {
    if (isBrowser) {
      document.body.classList.add('dimmable');
      document.body.classList.add('dimmed');
    }
  };

  /** Build a function to remove class from body on portal unmount */
  const handlePortalUnmount = () => {
    if (isBrowser) {
      document.body.classList.remove('dimmable');
      document.body.classList.remove('dimmed');
    }
  };

  /** Return the Dimmer */
  if (page) {
    return (
      <Portal
        closeOnEscape={false}
        closeOnDocumentClick={false}
        open={visible}
        openOnTriggerClick={false}
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
