import * as React from 'react'

import { AppBucketsICON } from '../../../fontawesome/icon-file-generator/fa-icon';
import { AppBucketsSIZE } from '../../generic'

import { StrictFieldProps } from '../Field';

export interface InputProps extends StrictInputProps {
  [key: string]: any,
  [props: string]: {}
}

export interface StrictInputProps extends StrictFieldProps {
  /** Disabled Field */
  disabled?: boolean,

  /** Input Tab Index */
  tabIndex?: number,

  /** Input Type */
  type?: 'date' | 'email' | 'file' | 'image' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url',
}

declare class Input extends React.Component<InputProps, {}> { }

export default Input
