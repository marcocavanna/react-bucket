import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import FieldInfo from '../../component-info/Field.info.json';

import { Field } from '../../../../../src/react';

export default {
  path: '/field',

  icon: 'paragraph',

  hero: {
    header  : 'Field',
    content : ''
  },

  props: {
    Field: {
      ...loadComponentInfo(FieldInfo)
    }

  },

  examples: {

  }

};
