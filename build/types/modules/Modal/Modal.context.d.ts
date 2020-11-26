import * as React from 'react';
export declare type ModalContext = {
  closeModal: (e: React.MouseEvent<HTMLElement>) => void;
};
declare const useModal: () => ModalContext,
  ModalProvider: React.Provider<ModalContext>,
  ModalConsumer: React.Consumer<ModalContext>;
export { useModal, ModalProvider, ModalConsumer };
