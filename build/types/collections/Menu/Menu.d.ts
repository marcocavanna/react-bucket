import { CreatableFunctionComponent } from '../../generic';
import { MenuProps } from './Menu.types';
import MenuItem from './MenuItem';
declare type MenuComponent = CreatableFunctionComponent<MenuProps> & {
  Item: typeof MenuItem;
};
declare const Menu: MenuComponent;
export default Menu;
