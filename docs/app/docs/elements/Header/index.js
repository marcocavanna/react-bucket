import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import HeaderInfo from '../../component-info/Header.info.json';

import { Header } from '../../../../../src/react';

export default {
  path: '/header',

  icon: 'heading',

  hero: {
    header  : 'Header',
    content : 'A header provides a short summary of content'
  },

  props: {
    Header: {
      ...loadComponentInfo(HeaderInfo)
    }

  },

  examples: {

  }

};
