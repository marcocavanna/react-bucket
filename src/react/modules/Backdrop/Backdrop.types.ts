import * as React from 'react';
import { PortalProps } from '@appbuckets/react-ui-core';

import { MinimalReactBucketComponentProps } from '../../generic';

import { LoaderProps } from '../../elements/Loader';

import { StrictBackdropInnerProps } from './BackdropInner.types';


export type BackdropPortalProps = 'closeOnDocumentClick'
  | 'closeOnEscape'
  | 'openOnTriggerClick'
  | 'openOnTriggerFocus'
  | 'openOnTriggerMouseEnter'
  | 'trigger'
  | 'triggerRef';

export interface BackdropProps extends MinimalReactBucketComponentProps<StrictBackdropProps> {
}

export interface StrictBackdropProps extends Pick<PortalProps, BackdropPortalProps>, StrictBackdropInnerProps {
  /** Set a Loader as Backdrop Inner Content */
  loading?: boolean;

  /** Manually override Loader Props */
  loaderProps?: LoaderProps;

  /** Callback fired on Backdrop try to close */
  onClose?: (e: React.MouseEvent<HTMLElement>, props: BackdropProps) => void;

  /** Callback fired on Backdrop Mount */
  onMount?: (nothing: null, props: BackdropProps) => void;

  /** Callback fired on Backdrop try to open */
  onOpen?: (e: React.MouseEvent<HTMLElement>, props: BackdropProps) => void;

  /** Callback fired on Backdrop Unmount */
  onUnmount?: (nothing: null, props: BackdropProps) => void;

  /** Set the backdrop as full page */
  page?: boolean;
}
