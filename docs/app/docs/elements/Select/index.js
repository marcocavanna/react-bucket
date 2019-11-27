import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import SelectInfo from '../../component-info/Select.info.json';

import { Select } from '../../../../../src/react';

export default {
  path: '/select',

  icon: 'check circle',

  hero: {
    header  : 'Select',
    content : 'A Select is sugar for Dropdown selection'
  },

  props: {
    Select: {
      ...loadComponentInfo(SelectInfo)
    }

  },

  examples: {

  }

};
