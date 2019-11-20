import React from 'react';

import {
  createShorthandFactory
} from '../../lib';

import Button from '../Button';

const ItemTool = props => (
  <React.Fragment>
    {Button.create(props, { autoGenerateKey: false, overrideProps: { className: 'item-tool', flat: true } })}
  </React.Fragment>
);

ItemTool.create = createShorthandFactory(ItemTool, props => props);

export default ItemTool;
