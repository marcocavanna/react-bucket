import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import ToastInfo from '../../component-info/Toast.info.json';

import { Toast } from '../../../../../src/react';

export default {
  path: '/toast',

  icon: 'bread slice',

  hero: {
    header  : 'Toast',
    content : 'A Toast is a push notification'
  },

  props: {
    Toast: {
      ...loadComponentInfo(ToastInfo)
    }

  },

  examples: {

  }

};
