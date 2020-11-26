import { CreatableFunctionComponent } from '../../generic';
import HeaderContent from './HeaderContent';
import HeaderSubheader from './HeaderSubheader';
import { HeaderProps } from './Header.types';
declare type HeaderComponent = CreatableFunctionComponent<HeaderProps> & {
  Content: typeof HeaderContent;
  Subheader: typeof HeaderSubheader;
};
declare const Header: HeaderComponent;
export default Header;
