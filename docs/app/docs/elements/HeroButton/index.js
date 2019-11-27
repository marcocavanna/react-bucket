import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import HeroButtonInfo from '../../component-info/HeroButton.info.json';

import { HeroButton } from '../../../../../src/react';

export default {
  path: '/herobutton',

  icon: 'columns',

  hero: {
    header  : 'Hero Button',
    content : 'An hero button is a component used to create a Panel Button'
  },

  props: {
    HeroButton: {
      ...loadComponentInfo(HeroButtonInfo)
    }

  },

  examples: {

  }

};
