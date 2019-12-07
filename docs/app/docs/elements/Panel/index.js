import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import PanelInfo from '../../component-info/Panel.info.json';

import { Panel, Header } from '../../../../../src/react';

export default {
  path: '/panel',

  icon: 'solar panel',

  hero: {
    header  : 'Panel',
    content : 'A Panel displays site content in a manner similar to a playing card.'
  },

  props: {
    Item: {
      ...loadComponentInfo(PanelInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Panel',
      subheader : 'A Panel is used to contain some contents.',
      content   : (
        <React.Fragment>
          <Header>This the content of the panel</Header>
        </React.Fragment>
      )
    },

    colored: {
      header    : 'Color',
      subheader : 'It is possible to change the text color of a Panel',
      color     : 'blue',
      content   : (
        <React.Fragment>
          <Header>This panel has color Blue</Header>
        </React.Fragment>
      )
    },

    textAlign: {
      header    : 'Text Align',
      subheader : 'It is possibile to manage the text align of the content in a Panel',
      textAlign : 'center',
      content   : (
        <React.Fragment>
          <Header textAlign='center'>This Panel has text align center</Header>
        </React.Fragment>
      )
    },

    icon: {
      header    : 'Icon',
      subheader : 'A panel can have an Icon in the Header',
      icon      : 'info',
      content   : (
        <React.Fragment>
          <Header>This panel has an Info Icon</Header>
        </React.Fragment>
      )
    },

    fabIcon: {
      header    : 'Fab Icon',
      subheader : 'A panel can have a Fab Icon as Button',
      fab       : 'plus',
      content   : (
        <React.Fragment>
          <Header>This panel has the fab icon</Header>
        </React.Fragment>
      )
    },

    loading: {
      header    : 'Loading',
      subheader : 'A panel can be in loading state',
      loading   : true,
      content   : (
        <React.Fragment>
          <Header>This panel is Loading</Header>
        </React.Fragment>
      )
    }

  }

};
