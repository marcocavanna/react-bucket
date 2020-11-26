import { CreatableFunctionComponent } from '../../generic';
import { LabelProps } from './Label.types';
import LabelGroup from './LabelGroup';
declare type LabelComponent = CreatableFunctionComponent<LabelProps> & {
  Group: typeof LabelGroup;
};
declare const Label: LabelComponent;
export default Label;
