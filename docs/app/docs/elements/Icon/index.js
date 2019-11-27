import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import IconInfo from '../../component-info/Icon.info.json';

import { Icon } from '../../../../../src/react';

export default {
  path: '/icon',

  icon: 'user',

  hero: {
    header  : 'Icon',
    content : 'An icon is a glyph used to represent something else.'
  },

  props: {
    Icon: {
      ...loadComponentInfo(IconInfo)
    }

  },

  examples: {

  }

};
