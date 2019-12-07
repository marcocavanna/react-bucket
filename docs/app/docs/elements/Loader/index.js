import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import LoaderInfo from '../../component-info/Loader.info.json';

import { Loader } from '../../../../../src/react';

export default {
  path: '/loader',

  icon: 'truck loading',

  hero: {
    header  : 'Loader',
    content : 'A loader alerts a user to wait for an activity to complete.'
  },

  props: {
    Loader: {
      ...loadComponentInfo(LoaderInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Loader',
      subheader : 'A standard Loader.',
      content   : (
        <React.Fragment>
          Da aggiornare
        </React.Fragment>
      )
    }

  }

};
