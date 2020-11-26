import * as React from 'react';
import { ModalProps } from './Modal.types';
import ModalActions from './ModalActions';
import ModalContent from './ModalContent';
import ModalHeader from './ModalHeader';
declare type ModalComponent = React.FunctionComponent<ModalProps> & {
  Actions: typeof ModalActions;
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
};
declare const Modal: ModalComponent;
export default Modal;
