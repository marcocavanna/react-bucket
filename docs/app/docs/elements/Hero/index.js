import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import HeroInfo from '../../component-info/Hero.info.json';

import { Hero } from '../../../../../src/react';

export default {
  path: '/hero',

  icon: 'mask',

  hero: {
    header  : 'Hero',
    content : 'An Hero behaves like a panel'
  },

  props: {
    Hero: {
      ...loadComponentInfo(HeroInfo)
    }

  },

  examples: {

  }

};
