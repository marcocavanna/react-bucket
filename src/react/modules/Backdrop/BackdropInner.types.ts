import * as React from 'react';

import { FlexContentVerticalAlign, MinimalReactBucketComponentProps } from '../../generic';


export interface BackdropInnerProps extends MinimalReactBucketComponentProps<StrictBackdropInnerProps> {
}

export interface StrictBackdropInnerProps {
  /** Handle Click Event */
  onClick?: (event: React.MouseEvent, props: BackdropInnerProps) => void;

  /** Handle Click Event occurred outside Backdrop Content, but in Backdrop Area */
  onClickOutside?: (event: React.MouseEvent, props: BackdropInnerProps) => void;

  /** Set the backdrop as full page */
  page?: boolean;

  /** Set the content vertical align */
  verticalAlign?: FlexContentVerticalAlign;

  /** Set the backdrop and its content as visible */
  visible?: boolean;
}
