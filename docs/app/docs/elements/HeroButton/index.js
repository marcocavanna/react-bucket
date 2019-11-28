import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import HeroButtonInfo from '../../component-info/HeroButton.info.json';

import { HeroButton, Field } from '../../../../../src/react';

export default {
  path: '/herobutton',

  icon: 'columns',

  hero: {
    header  : 'Hero Button',
    content : 'An hero button is a component used to create a Panel Button'
  },

  props: {
    HeroButton: {
      ...loadComponentInfo(HeroButtonInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Hero Button',
      subheader : 'standard hero button',
      content   : (
        <React.Fragment>
          <HeroButton
            header='Hero Button'
            content='This is the content of a standard Hero Button'
          />
        </React.Fragment>
      )
    },

    header: {
      header    : 'Header',
      subheader : 'An Hero Button can have only an Header',
      content   : (
        <React.Fragment>
          <HeroButton
            header='Hero Button With only Header'
          />
        </React.Fragment>
      )
    },

    content: {
      header    : 'Content',
      subheader : 'An Hero Button can have only a Content',
      content   : (
        <React.Fragment>
          <HeroButton
            content='This hero has only the content, without header'
          />
        </React.Fragment>
      )
    },

    colored: {
      header    : 'Colored',
      subheader : 'Hero Buttons can have nine different colors, expressed as a number between 0 and 9',
      content   : (
        <React.Fragment>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
            <HeroButton
              key={index}
              header={`Hero variation ${index}`}
              content={`This hero has variation ${index}`}
              variation={index}
            />
          ))}
        </React.Fragment>
      )
    },

    discreet: {
      header    : 'Discreet',
      subheader : 'An Hero Button can be discreet',
      content   : (
        <React.Fragment>
          <HeroButton
            discreet
            header='Discreet Hero'
            content='Discreet Hero does not have all the body mouse hover'
          />
        </React.Fragment>
      )
    },

    icon: {
      header    : 'Icon',
      subheader : 'An Hero Button can have an icon',
      content   : (
        <React.Fragment>
          <HeroButton
            header='Hero Icon'
            content='This hero has an Icon'
            icon='industry'
          />
          <HeroButton
            discreet
            variation='1'
            header='Discreet Hero Icon'
            content='This discreet hero button has an Icon'
            icon='industry'
          />
        </React.Fragment>
      )
    },

    disabled: {
      header    : 'Disabled',
      subheader : 'An Hero Button can be disabled',
      content   : (
        <React.Fragment>
          <HeroButton
            disabled
            header='Disabled Hero'
            content='This hero is disabled'
          />
        </React.Fragment>
      )
    },

  }

};
