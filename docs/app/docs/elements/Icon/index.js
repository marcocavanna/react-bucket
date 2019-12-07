import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import IconInfo from '../../component-info/Icon.info.json';

import { Icon, Spacer } from '../../../../../src/react';

export default {
  path: '/icon',

  icon: 'icons',

  hero: {
    header  : 'Icons',
    content : 'An icon is a glyph used to represent something else.'
  },

  props: {
    Icon: {
      ...loadComponentInfo(IconInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Icon',
      subheader : 'An Icon is a glyph',
      content   : (
        <React.Fragment>
          <Icon
            name='atom'
            size='big'
          />
        </React.Fragment>
      )
    },

    bordered: {
      header    : 'Bordered',
      subheader : 'Display Icon Border',
      content   : (
        <React.Fragment>
          <Icon
            bordered
            name='users'
            size='big'
          />
          <Icon
            bordered
            name='user'
            size='big'
          />
          <Icon
            bordered
            name='cog'
            size='big'
          />
          <Icon
            bordered
            name='cogs'
            size='big'
          />
        </React.Fragment>
      )
    },

    flip: {
      header    : 'Flipped',
      subheader : 'An Icon can be flipped horizontal, vertical or both',
      content   : (
        <React.Fragment>
          <Icon
            name='arrow alt circle up'
            size='huge'
          />
          <Icon
            name='arrow alt circle up'
            size='huge'
            flip='vertical'
          />
          <Spacer />
          <Icon
            name='arrow alt circle left'
            size='huge'
          />
          <Icon
            name='arrow alt circle left'
            size='huge'
            flip='horizontal'
          />
        </React.Fragment>
      )
    },

    sized: {
      header    : 'Sized',
      subheader : 'An Icon can have some sizes',
      content   : (
        <React.Fragment>
          <Icon
            name='font'
            size='extra-small'
          />
          <Icon
            name='font'
            size='small'
          />
          <Icon
            name='font'
            size='normal'
          />
          <Icon
            name='font'
            size='large'
          />
          <Icon
            name='font'
            size='big'
          />
          <Icon
            name='font'
            size='huge'
          />
        </React.Fragment>
      )
    },

    disabled: {
      header    : 'Disabled',
      subheader : 'An Icon can be disabled',
      content   : (
        <React.Fragment>
          <Icon
            disabled
            name='users'
            size='big'
          />
        </React.Fragment>
      )
    },

    spin: {
      header    : 'Spin',
      subheader : 'Icon can have a spin to animate it',
      content   : (
        <React.Fragment>
          <Icon
            spin
            name='arrow alt circle up'
            size='big'
          />
        </React.Fragment>
      )
    },

    fitted: {
      header    : 'Fitted',
      subheader : 'An Icon can be fitted, without any space to the left or right of it',
      content   : (
        <React.Fragment>
          Where are white spaces
          <Icon
            fitted
            name='question'
          />
        </React.Fragment>
      )
    },

    rotate: {
      header    : 'Rotated',
      subheader : '',
      content   : (
        <React.Fragment>
          <Icon
            name='cloud'
            rotate={270}
          />
          <Icon
            name='cloud'
            rotate={90}
          />
          <Icon
            name='cloud'
            rotate={180}
          />
        </React.Fragment>
      )
    },

    colored: {
      header    : 'Colored',
      subheader : 'An Icon can be formatted with different colors',
      content   : (
        <React.Fragment>
          <Icon
            name='users'
            size='big'
            color='primary'
          />
          <Icon
            name='users'
            size='big'
            color='danger'
          />
          <Icon
            name='users'
            size='big'
            color='warning'
          />
          <Icon
            name='users'
            size='big'
            color='success'
          />
        </React.Fragment>
      )
    },

    link: {
      header    : 'Link',
      subheader : 'An Icon can be formatted as a Link',
      content   : (
        <React.Fragment>
          <Icon
            link
            name='times'
            size='big'
          />
          <Icon
            link
            name='check'
            size='big'
          />
        </React.Fragment>
      )
    }

  }

};
