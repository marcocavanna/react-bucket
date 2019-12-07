import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import LabelInfo from '../../component-info/Label.info.json';

import { Label } from '../../../../../src/react';

export default {
  path: '/label',

  icon: 'tag',

  hero: {
    header  : 'Label',
    content : 'A label display content classification'
  },

  props: {
    Label: {
      ...loadComponentInfo(LabelInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Label',
      subheader : 'A standard label',
      content   : (
        <React.Fragment>
          <Label
            content='Label'
          />
        </React.Fragment>
      )
    },

    icon: {
      header    : 'Icon',
      subheader : 'A Label can be formatted with an icon',
      content   : (
        <React.Fragment>
          <Label
            icon='info'
            content='information'
          />
        </React.Fragment>
      )
    },

    colors: {
      header    : 'Colored',
      subheader : 'A Label can be formatted with different colors',
      content   : (
        <React.Fragment>
          <Label
            content='primary'
            color='primary'
          />
          <Label
            content='secondary'
            color='secondary'
          />
          <Label
            content='danger'
            color='danger'
          />
          <Label
            content='success'
            color='success'
          />
        </React.Fragment>
      )
    },

    deatil: {
      header    : 'Detail',
      subheader : 'A Label can be formatted with some details',
      content   : (
        <React.Fragment>
          <Label
            content='Label'
            detail='Label detail'
          />
        </React.Fragment>
      )
    },

    group: {
      header    : 'Group',
      subheader : 'It is possible to create Groups of Label',
      content   : (
        <React.Fragment>
          <Label.Group>
            <Label content='first' />
            <Label content='second' />
            <Label content='third' />
          </Label.Group>
        </React.Fragment>
      )
    }

  }

};
