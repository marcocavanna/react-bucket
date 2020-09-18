import * as React from 'react';

import {
  ReactBucketComponentProps,
  SharedComponentStateProps,
  ShorthandCollection,
  ShorthandItem
} from '../../generic';

import { ButtonProps } from '../Button';
import { IconProps } from '../Icon';


export interface FieldProps extends React.PropsWithoutRef<ReactBucketComponentProps<StrictFieldProps>> {
}

export interface StrictFieldProps extends SharedComponentStateProps {
  /** A Button to Show */
  actions?: ShorthandCollection<ButtonProps>;

  /** Set action button position, default to right */
  actionsPosition?: 'left' | 'right';

  /** User defined className used for content element */
  contentClassName?: string;

  /** Set field content type */
  contentType?: 'input';

  /** Set the field as Disabled */
  disabled?: boolean;

  /** An hint, appended after field content */
  hint?: React.ReactNode;

  /** User defined className used for hint element */
  hintClassName?: string;

  /** An Icon to Show */
  icon?: ShorthandItem<IconProps>;

  /** Set the icon position, default to left */
  iconPosition?: 'left' | 'right';

  /** Set field as Dirty */
  isDirty?: boolean;

  /** Set field as Focused */
  isFocused?: boolean;

  /** Set field as Touched */
  isTouched?: boolean;

  /** Field Label */
  label?: React.ReactNode;

  /** Set field as read only */
  readOnly?: boolean;

  /** Set the field as Required */
  required?: boolean;
}
