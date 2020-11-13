import * as React from 'react';

import {
  ReactBucketComponentProps,
  ShorthandCollection
} from '../../generic';

import { ButtonProps } from '../../elements/Button';


export interface ModalActionsProps extends ReactBucketComponentProps<StrictModalActionsProps> {
}

export interface StrictModalActionsProps {
  /** Buttons Action Shorthand */
  actions?: ShorthandCollection<ButtonProps>;

  /** On Action Click Handler */
  onActionClick?: (e: React.MouseEvent<HTMLButtonElement>, props: ButtonProps) => void;
}
