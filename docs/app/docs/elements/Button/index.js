import React from 'react';

import ButtonInfo from '../../component-info/Button.info.json';
import ButtonGroupInfo from '../../component-info/ButtonGroup.info.json';
import loadComponentInfo from '../../util/loadComponentInfo';

import { Button } from '../../../../../src/react';

export default {

  path: '/button',

  icon: 'mouse pointer',

  hero: {
    header  : 'Button',
    content : 'A Button indicates a possible user action.'
  },

  props: {

    Button: {
      ...loadComponentInfo(ButtonInfo)
    },

    'Button.Group': {
      ...loadComponentInfo(ButtonGroupInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Button',
      subheader : 'A standard Button Component',
      content   : <Button>Click Here</Button>
    },

    colored: {
      header    : 'Colored',
      subheader : 'A Button can be colorized',
      content   : (
        <React.Fragment>
          <Button primary>primary</Button>
          <Button secondary>secondary</Button>
          <Button danger inverted>inverted</Button>
        </React.Fragment>
      )
    }

  }

};
