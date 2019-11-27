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
    },

    icon: {
      header    : 'Icon',
      subheader : 'Using icon property it is possible to add any fontawesome icon to your button.',
      content   : (
        <React.Fragment>
          <Button icon='info' content='info button' />
        </React.Fragment>
      )
    },

    iconPosition: {
      header    : 'Icon Position',
      subheader : 'It is possible to manage the icon position',
      content   : (
        <React.Fragment>
          <Button icon='info' iconPosition='right' content='icon right' />
        </React.Fragment>
      )
    },

    simpleIcon: {
      header    : 'Simple Icon',
      subheader : 'It is also possible to use only the icon in the button, without a text',
      content   : (
        <React.Fragment>
          <Button icon='globe' />
        </React.Fragment>
      )
    },

    circleIcon: {
      header    : 'Circle Icon',
      subheader : 'Icon Button can be circle',
      content   : (
        <React.Fragment>
          <Button circle icon='facebook' />
          <Button circle icon='twitter' />
          <Button circle icon='instagram' />
          <Button circle icon='youtube' />
          <Button circle icon='twitch' />
        </React.Fragment>
      )
    },

    flat: {
      header    : 'Flat',
      subheader : 'A button can be flat',
      content   : (
        <React.Fragment>
          <Button flat content='flat button' />
        </React.Fragment>
      )
    },

    full: {
      header    : 'Full',
      subheader : 'A button can be full sized',
      content   : (
        <React.Fragment>
          <Button full content='full size button' />
        </React.Fragment>
      )
    },

    disabled: {
      header    : 'Disabled',
      subheader : 'A button can be disabled',
      content   : (
        <React.Fragment>
          <Button disabled content='disabled' />
        </React.Fragment>
      )
    },

    loading: {
      header    : 'Loading',
      subheader : 'It is possible to render a loading button',
      content   : (
        <React.Fragment>
          <Button loading content='is loading' />
        </React.Fragment>
      )
    },

    group: {
      header    : 'Group',
      subheader : 'Buttons can exist togheter as a group',
      content   : (
        <React.Fragment>
          <Button.Group>
            <Button content='one' />
            <Button content='two' />
            <Button content='three' />
          </Button.Group>
        </React.Fragment>
      )
    },

    verticalGroup: {
      header    : 'Vertical Group',
      subheader : 'It is possible to render vertical group buttons',
      content   : (
        <React.Fragment>
          <Button.Group vertical>
            <Button content='one' />
            <Button content='two' />
            <Button content='three' />
          </Button.Group>
        </React.Fragment>
      )
    },

    fullGroup: {
      header    : 'Full',
      subheader : 'It is possible to get full sized buttons group',
      content   : (
        <React.Fragment>
          <Button.Group full>
            <Button content='one' />
            <Button content='two' />
            <Button content='three' />
          </Button.Group>
        </React.Fragment>
      )
    },

    iconGroup: {
      header    : 'Icon Group',
      subheader : 'Buttons group can show groups of icons',
      content   : (
        <React.Fragment>
          <Button.Group>
            <Button icon='save' />
            <Button icon='print' />
            <Button icon='file' />
            <Button icon='pencil alt' />
            <Button icon='share' />
          </Button.Group>
        </React.Fragment>
      )
    },

    labeled: {
      header    : 'Labeled Group',
      subheader : 'Groups can be formatted as labeled icons',
      content   : (
        <React.Fragment>
          <Button.Group vertical>
            <Button icon='save' content='save' />
            <Button icon='print' content='print' />
            <Button icon='pencil alt' content='modify' />
            <Button icon='share' content='share' />
          </Button.Group>
        </React.Fragment>
      )
    },

    specialColors: {
      header    : 'Special Colors',
      subheader : 'Buttons can have special colors depending on the actions',
      content   : (
        <React.Fragment>
          <Button success content='success' />
          <Button warning content='warning' />
          <Button danger content='danger' />
          <Button info content='info' />
        </React.Fragment>
      )
    },

    inverted: {
      header    : 'Inverted colors',
      subheader : 'Buttons can have inverted color',
      content   : (
        <React.Fragment>
          <Button success inverted content='success' />
          <Button warning inverted content='warning' />
          <Button danger inverted content='danger' />
          <Button info inverted content='info' />
        </React.Fragment>
      )
    }
  }
};
