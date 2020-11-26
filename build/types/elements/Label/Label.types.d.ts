import * as React from 'react';
import {
  ReactBucketComponentProps,
  ReactBucketIcon,
  SharedComponentStateProps,
  ShorthandItem,
} from '../../generic';
import { IconProps } from '../Icon';
import { ButtonProps } from '../Button';
export interface LabelProps
  extends ReactBucketComponentProps<StrictLabelProps>,
    SharedComponentStateProps {}
export interface StrictLabelProps {
  /** Set the Disabled style */
  disabled?: boolean;
  /** Icon shorthand */
  icon?: ReactBucketIcon<IconProps>;
  /** On click Handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: LabelProps) => void;
  /** On label remove handler */
  onRemove?: (
    e: React.MouseEvent<HTMLButtonElement>,
    props: LabelProps
  ) => void;
  /** Set the label as removable */
  removable?: boolean | ShorthandItem<ButtonProps>;
}
