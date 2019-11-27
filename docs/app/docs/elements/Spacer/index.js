import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import SpacerInfo from '../../component-info/Spacer.info.json';

import { Spacer } from '../../../../../src/react';

export default {
  path: '/spacer',

  icon: 'align center',

  hero: {
    header  : 'Spacer',
    content : 'A Spacer divides two contents with a blank space'
  },

  props: {
    Spacer: {
      ...loadComponentInfo(SpacerInfo)
    }

  },

  examples: {

  }

};
