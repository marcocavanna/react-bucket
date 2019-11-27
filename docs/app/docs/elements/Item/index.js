import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import ItemInfo from '../../component-info/Item.info.json';

import { Item } from '../../../../../src/react';

export default {
  path: '/item',

  icon: 'gem',

  hero: {
    header  : 'Item',
    content : 'An item view presents large collections of site content for display.'
  },

  props: {
    Item: {
      ...loadComponentInfo(ItemInfo)
    }

  },

  examples: {

  }

};
