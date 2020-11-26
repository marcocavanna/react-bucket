import { CreatableFunctionComponent } from '../../generic';
import { ButtonProps } from './Button.types';
import ButtonGroup from './ButtonGroup';
declare type ButtonComponent = CreatableFunctionComponent<ButtonProps> & {
  Group: typeof ButtonGroup;
};
declare const Button: ButtonComponent;
export default Button;
