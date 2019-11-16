import {
  createShorthandFactory
} from '../../lib';

import Button from '../Button';

const ItemTool = props => Button.create(props, { autoGenerateKey: false, overrideProps: { className: 'item-tool', flat: true } });

ItemTool.create = createShorthandFactory(ItemTool, props => props);

export default ItemTool;
