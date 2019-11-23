import React from 'react';

import { Button } from '../../../../../src/react';

export default {

  path: '/button',

  icon: 'mouse pointer',

  hero: {
    header  : 'Button',
    content : 'A Button indicates a possible user action.'
  },

  props: {
    as: {
      type    : 'Any',
      comment : 'An element used to render'
    },

    children: {
      type    : 'React Element',
      comment : 'Component Children Node'
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
