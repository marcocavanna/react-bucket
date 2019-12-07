import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import ImageInfo from '../../component-info/Image.info.json';

import { Image } from '../../../../../src/react';

import TestImage from './img.png';
import UserImage from './user.png';

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
          <Image src={TestImage} />
        </React.Fragment>
      )
    },

    avatar: {
      header    : 'Avatar',
      subheader : 'An Image can be formatted as avatar style',
      content   : (
        <React.Fragment>
          <Image
            avatar
            src={UserImage}
          /> Username
        </React.Fragment>
      )
    },

    bordered: {
      header    : 'Bordered',
      subheader : 'An Image can be formatted to show the border',
      content   : (
        <React.Fragment>
          <Image
            bordered
            src={TestImage}
          />
        </React.Fragment>
      )
    },

    circular: {
      header    : 'Circular',
      subheader : 'An Image can be formatted as circular',
      content   : (
        <React.Fragment>
          <Image
            circular
            src={TestImage}
          />
        </React.Fragment>
      )
    },

    rounded: {
      header    : 'Rounded',
      subheader : 'An Image can be formatted rounded',
      content   : (
        <React.Fragment>
          <Image
            rounded
            src={TestImage}
          />
        </React.Fragment>
      )
    },
    disabled: {
      header    : 'Disabled',
      subheader : 'An Image can be disabled',
      content   : (
        <React.Fragment>
          <Image
            disabled
            src={TestImage}
          />
        </React.Fragment>
      )
    },

    full: {
      header    : 'Full',
      subheader : 'An Image can be formatted as full, to take all the page width',
      content   : (
        <React.Fragment>
          <Image
            full
            src={TestImage}
          />
        </React.Fragment>
      )
    },

    link: {
      header    : 'Link',
      subheader : 'An Image can be formatted as a Link',
      content   : (
        <React.Fragment>
          <Image
            src={TestImage}
            href='image'
          />
        </React.Fragment>
      )
    },

    inline: {
      header    : 'Inline',
      subheader : 'An Image can be formatted as an inline content',
      content   : (
        <React.Fragment>
          <p>This is an inline <Image inline src={TestImage} /> Content</p>
        </React.Fragment>
      )
    },

    spaced: {
      header    : 'Spaced',
      subheader : 'An Image can be formatted to add spaces left or right',
      content   : (
        <React.Fragment>
          <Image
            dimmer
            src={TestImage}
            spaced='left'
          />
        </React.Fragment>
      )
    }

  }

};
