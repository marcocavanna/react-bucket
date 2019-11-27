import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import LabelInfo from '../../component-info/Label.info.json';

import { Label } from '../../../../../src/react';

export default {
  path: '/label',

  icon: 'tag',

  hero: {
    header  : 'Label',
    content : 'A label display content classification'
  },

  props: {
    Label: {
      ...loadComponentInfo(LabelInfo)
    }

  },

  examples: {

  }

};
