import { CreatableFunctionComponent } from '../../generic';
import BackdropInner from './BackdropInner';
import { BackdropProps } from './Backdrop.types';
declare type BackdropComponent = CreatableFunctionComponent<BackdropProps> & {
  Inner: typeof BackdropInner;
};
declare const Backdrop: BackdropComponent;
export default Backdrop;
