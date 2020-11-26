import { ReactBucketComponentProps, ShorthandCollection } from '../../generic';
import { ButtonProps } from '../Button';
export interface ItemToolsProps
  extends ReactBucketComponentProps<StrictItemToolsProps> {}
export interface StrictItemToolsProps {
  /** Disable Children Use for item tools */
  children?: never;
  /** Disable all tools */
  disabled?: boolean;
  /** Create Tools */
  tools?: ShorthandCollection<ButtonProps>;
}
