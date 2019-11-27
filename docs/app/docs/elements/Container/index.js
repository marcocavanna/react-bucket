import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import ContainerInfo from '../../component-info/Container.info.json';

import { Container } from '../../../../../src/react';

export default {

  path: '/container',

  icon: 'box',

  hero: {
    header  : 'Container',
    content : 'A container limits content to a maximum width'
  },

  props: {
    Container: {
      ...loadComponentInfo(ContainerInfo)
    }

  },

  examples: {

  }

};
