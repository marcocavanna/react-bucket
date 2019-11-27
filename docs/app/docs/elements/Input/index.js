import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import InputInfo from '../../component-info/Input.info.json';

import { Input } from '../../../../../src/react';

export default {
  path: '/input',

  icon: 'keyboard',

  hero: {
    header  : 'Input',
    content : 'An Input is a field used to elicit a response from a user.'
  },

  props: {
    Input: {
      ...loadComponentInfo(InputInfo)
    }

  },

  examples: {

  }

};
