import { CreatableFunctionComponent } from '../../generic';
import { ItemContentProps } from './ItemContent.types';
import ItemHeader from './ItemHeader';
import ItemMeta from './ItemMeta';
import ItemText from './ItemText';
declare type ItemContentComponent = CreatableFunctionComponent<
  ItemContentProps
> & {
  Header: typeof ItemHeader;
  Meta: typeof ItemMeta;
  Text: typeof ItemText;
};
declare const ItemContent: ItemContentComponent;
export default ItemContent;
