import React, { useState, cloneElement } from 'react';

import getSharedProps from '../../shared/props';

import { Checkbox, Label, Container } from '../../../../../src/react';

export default {

  path: '/checkbox',

  icon: 'check',

  hero: {
    header  : 'Checkbox',
    content : 'A checkbox allows user to select a value from a small set of options, often binary.'
  },

  props: {

    Checkbox: {
      ...getSharedProps('as', 'children')
    }

  },

  examples: {

    standard: {
      header    : 'CheckBox',
      subheader : 'A Box for Checking',
      content   : <Checkbox label='Check this Option' />
    },

    radioValue: {
      header    : 'Radio Group',
      subheader : 'Radios in group must be controlled components',
      content   : () => {

        const [value, setValue] = useState('none');

        const handleRadioChange = (e, { value: newValue }) => setValue(newValue);

        return (
          <React.Fragment>

            <Container
              content={<span>Selected Value is <Label content={value} /></span>}
              marginBottom='4'
            />

            <Checkbox
              radio
              label='Choose this'
              value='this'
              checked={value === 'this'}
              onChange={handleRadioChange}
            />
            <Checkbox
              radio
              label='Choose that'
              value='that'
              checked={value === 'that'}
              onChange={handleRadioChange}
            />
          </React.Fragment>
        );
      }
    }

  }

};
