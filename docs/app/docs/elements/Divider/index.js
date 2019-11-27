import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import DividerInfo from '../../component-info/Divider.info.json';

import { Divider, Button, Spacer, Icon, Label, Header } from '../../../../../src/react';

export default {
  path: '/divider',

  icon: 'divide',

  hero: {
    header  : 'Divider',
    content : 'A divider visually segments content into groups'
  },

  props: {

    Divider: {
      ...loadComponentInfo(DividerInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Divider',
      subheader : 'A segment to divide contents',
      content   : (
        <React.Fragment>
          <Header>First paragraph</Header>
          <Divider />
          <Header>Second paragraph</Header>
        </React.Fragment>
      )
    },

    labeled: {
      header    : 'Labeled',
      subheader : 'A divider can be labeled',
      content   : (
        <React.Fragment>
          <Header>First paragraph</Header>
          <Divider content='divider' />
          <Header>Second paragraph</Header>
        </React.Fragment>
      )
    },

    inverted: {
      header    : 'Inverted',
      subheader : 'A divider can be inverted',
      content   : (
        <React.Fragment>
          <Header>First paragraph</Header>
          <Divider inverted content='and' />
          <Header>Second paragraph</Header>
        </React.Fragment>
      )
    }
  }

};
