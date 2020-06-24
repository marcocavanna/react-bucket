import { ReactBucketComponentProps, ShorthandCollection } from '../../generic';
import { ButtonProps } from '../Button';


export interface PanelBodyProps extends ReactBucketComponentProps<StrictPanelBodyProps> {
}

export interface StrictPanelBodyProps {

  /** Panel FAB Collections */
  fab?: ShorthandCollection<ButtonProps>;

}
