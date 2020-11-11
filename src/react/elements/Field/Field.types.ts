import * as React from 'react';

import {
  ReactBucketComponentProps,
  ReactBucketIcon,
  SharedComponentStateProps,
  ShorthandCollection,
  ShorthandContent
} from '../../generic';

import { ButtonProps } from '../Button';
import { IconProps } from '../Icon';


export interface FieldProps extends ReactBucketComponentProps<StrictFieldProps> {
}

export interface StrictFieldProps extends SharedComponentStateProps {
  /** A Button to Show */
  actions?: ShorthandCollection<ButtonProps>;

  /** Set action button position, default to right */
  actionsPosition?: 'left' | 'right';

  /** Set the Field as Clearable */
  clearable?: boolean;

  /** User defined className used for content element */
  contentClassName?: string;

  /** Set field content type */
  contentType?: 'input' | 'select input' | 'checkbox' | 'radio' | 'switch';

  /** Set the field as Disabled */
  disabled?: boolean;

  /** An hint, appended after field content */
  hint?: ShorthandContent;

  /** User defined className used for hint element */
  hintClassName?: string;

  /** An Icon to Show */
  icon?: ReactBucketIcon<IconProps>;

  /** Set the icon position, default to left */
  iconPosition?: 'left' | 'right';

  /** Set field as Dirty */
  isDirty?: boolean;

  /** Set field as Focused */
  isFocused?: boolean;

  /** Set field as Touched */
  isTouched?: boolean;

  /** Field Label */
  label?: ShorthandContent;

  /** On Clear Button click */
  onClear?: (e: React.MouseEvent<HTMLElement>) => void;

  /** Set field as read only */
  readOnly?: boolean;

  /** Set the field as Required */
  required?: boolean;
}
