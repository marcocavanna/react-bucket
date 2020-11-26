import { CreatableFunctionComponent } from '../../generic';
import { Avatar } from '../Avatar';
import { ItemProps } from './Item.types';
import ItemContent from './ItemContent';
import ItemGroup from './ItemGroup';
import ItemTools from './ItemTools';
declare type ItemComponent = CreatableFunctionComponent<ItemProps> & {
  Avatar: typeof Avatar;
  Content: typeof ItemContent;
  Group: typeof ItemGroup;
  Tools: typeof ItemTools;
};
declare const Item: ItemComponent;
export default Item;
