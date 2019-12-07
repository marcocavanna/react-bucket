import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import HeaderInfo from '../../component-info/Header.info.json';

import { Header, Spacer, Image } from '../../../../../src/react';

import TestImage from '../Image/short-paragraph.png';

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

    standard: {
      header    : 'Header',
      content   : (
        <React.Fragment>
          <Header
            content='this is a simple Header'
          />
          <Image
            src={TestImage}
          />
        </React.Fragment>
      )
    },

    subheader: {
      header    : 'Subheader',
      subheader : 'An Header can have a subheader',
      content   : (
        <React.Fragment>
          <Image
            src={TestImage}
          />
        </React.Fragment>)
    },

    icon: {
      header    : 'Icon',
      subheader : 'An Header can be formatted to emphasize an Icon',
      content   : (
        <React.Fragment>
          <Header
            content='Account'
            icon='user'
            subheader='Manage your Account'
          />
          <Header
            content='Settings'
            icon='cog'
            subheader='Manage your settings'
          />
        </React.Fragment>
      )
    },

    colored: {
      header    : 'Colored',
      subheader : 'Header can be formatted with some color',
      content   : (
        <React.Fragment>
          <Header
            content='Primary Header'
            subheader='This header has primary color'
            color='primary'
          />
          <Header
            content='Danger Header'
            subheader='This header has danger color'
            color='danger'
          />
        </React.Fragment>
      )
    },

    disabled: {
      header    : 'Disabled',
      subheader : 'An Header can be Disabled',
      content   : (
        <React.Fragment>
          <Header
            disabled
            content='Disabled Header'
            subheader='This header is disabled'
          />
        </React.Fragment>
      )
    },

    textAlign: {
      header    : 'Text Align',
      subheader : 'An Header can be text aligned',
      content   : (
        <React.Fragment>
          <Header
            content='This header is in the left'
            textAlign='left'
          />
          <Header
            content='This header is in the center'
            textAlign='center'
          />
          <Header
            content='This header is in the right'
            textAlign='right'
          />
        </React.Fragment>
      )
    },

    dividing: {
      header    : 'Dividing',
      subheader : 'An Header can be formatted to divide itself from the content below it',
      content   : (
        <React.Fragment>
          <Spacer />
          <Header
            dividing
            content='Dividing Header'
          />
          <Image
            src={TestImage}
          />
        </React.Fragment>
      )
    }

  }

};
