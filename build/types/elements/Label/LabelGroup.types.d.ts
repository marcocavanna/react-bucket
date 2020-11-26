import { ReactBucketComponentProps, ShorthandCollection } from '../../generic';
import { LabelProps } from './Label.types';
export interface LabelGroupProps
  extends ReactBucketComponentProps<StrictLabelGroupProps> {}
export interface StrictLabelGroupProps {
  /** Labels Shorthand */
  labels?: ShorthandCollection<LabelProps>;
}
