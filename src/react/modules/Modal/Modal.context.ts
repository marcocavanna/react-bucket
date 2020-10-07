import * as React from 'react';
import invariant from 'tiny-invariant';


export type ModalContext = { closeModal: (e: React.MouseEvent<HTMLElement>) => void };


/* --------
 * Create the Function to build the Modal Context
 * -------- */
function createModalContext() {
  /** Create the Context */
  const modalContext = React.createContext<ModalContext | undefined>(undefined);

  /** Init the Hook Function */
  function useModalHook(): ModalContext {
    /** Get the value of the context */
    const ctx = React.useContext(modalContext);
    /** Assert value exists */
    invariant(
      ctx !== undefined,
      'useModal hook must be invoked inside the Modal Context'
    );
    /** Return the Context */
    return ctx;
  }

  /** Return the built context */
  return [ useModalHook, modalContext.Provider, modalContext.Consumer ] as const;
}

export const [
  useModal,
  ModalProvider,
  ModalConsumer
] = createModalContext();
