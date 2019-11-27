import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import ImageInfo from '../../component-info/Image.info.json';

import { Container } from '../../../../../src/react';

export default {
  path: '/image',

  icon: 'image',

  hero: {
    header  : 'Image',
    content : 'An image is a graphic representation of something.'
  },

  props: {
    Image: {
      ...loadComponentInfo(ImageInfo)
    }

  },

  examples: {

  }

};
