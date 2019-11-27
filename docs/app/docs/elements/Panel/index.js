import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import PanelInfo from '../../component-info/Panel.info.json';

import { Panel } from '../../../../../src/react';

export default {
  path: '/panel',

  icon: 'solar panel',

  hero: {
    header  : 'Panel',
    content : 'A Panel displays site content in a manner similar to a playing card.'
  },

  props: {
    Item: {
      ...loadComponentInfo(PanelInfo)
    }

  },

  examples: {

  }

};
