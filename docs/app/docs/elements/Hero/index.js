import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import HeroInfo from '../../component-info/Hero.info.json';

import { Hero } from '../../../../../src/react';

export default {
  path: '/hero',

  icon: 'mask',

  hero: {
    header  : 'Hero',
    content : 'An Hero behaves like a panel'
  },

  props: {
    Hero: {
      ...loadComponentInfo(HeroInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Hero',
      subheader : 'A standard Hero',
      content   : (
        <React.Fragment>
          <Hero
            header='Hero Header'
            content='This is the hero content'
          />
        </React.Fragment>
      )
    },

    icon: {
      header    : 'Icon',
      subheader : 'An Hero can have an Icon',
      content   : (
        <React.Fragment>
          <Hero
            header='Hero Icon'
            content='This hero has an Icon'
            heroIcon='industry'
          />
        </React.Fragment>
      )
    },

    tools: {
      header    : 'Tools',
      subheader : 'An hero can have a tools button',
      content   : (
        <React.Fragment>
          <Hero
            header='Tools Hero'
            content='This hero has a tools button'
            tools={['tools button']}
          />
        </React.Fragment>
      )
    }

  }

};
