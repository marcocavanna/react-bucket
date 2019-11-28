import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import ImageInfo from '../../component-info/Image.info.json';

import { Image } from '../../../../../src/react';

import TestImage from './img.png';

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

    standard: {
      header    : 'Image',
      subheader : 'A normal Image',
      content   : (
        <React.Fragment>
          <Image src={TestImage} inline />
        </React.Fragment>
      )
    },

  }

};
