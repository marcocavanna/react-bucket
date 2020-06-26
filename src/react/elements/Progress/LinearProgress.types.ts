import * as React from 'react';

import { MinimalReactBucketComponentProps } from '../../generic';

import { ProgressIndicator, StrictSharedProgressProps } from './Shared.types';


export interface LinearProgressProps extends MinimalReactBucketComponentProps<StrictLinearProgressProps> {

}

export interface StrictLinearProgressProps extends StrictSharedProgressProps {
  /** Show the Indicator */
  indicator?: ProgressIndicator;

  /** Show Progress Limits */
  limits?: boolean | ((value: number) => React.ReactNode);

  /** Reverse Linear Logic, value will start from right */
  reverse?: boolean;
}
