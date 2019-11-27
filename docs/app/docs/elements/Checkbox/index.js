import React, { useState } from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import CheckboxInfo from '../../component-info/Checkbox.info.json';

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
      ...loadComponentInfo(CheckboxInfo)
    }

  },

  examples: {

    standard: {
      header    : 'CheckBox',
      subheader : 'A Box for Checking',
      content   : <Checkbox />
    },

    labeled: {
      header    : 'Labeled',
      subheader : 'A checkbox can have a label',
      content   : <Checkbox label='check this option' />
    },

    toggle: {
      header    : 'Toggle',
      subheader : 'A checkbox can toggle',
      content   : (
        <React.Fragment>
          <Checkbox toggle />
        </React.Fragment>
      )
    },

    slider: {
      header    : 'Slider',
      subheader : 'A checkbox can looks like a slider',
      content   : (
        <React.Fragment>
          <Checkbox slider />
        </React.Fragment>
      )
    },

    radio: {
      header    : 'Radio',
      subheader : 'A checkbox can be formatted as a radio element. This means it is an exclusive option.',
      content   : (
        <React.Fragment>
          <Checkbox radio label='radio choice' />
        </React.Fragment>
      )
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
    },

    readOnly: {
      header    : 'Read Only',
      subheader : 'A checkbox can be read only and unable to change states',
      content   : (
        <React.Fragment>
          <Checkbox readOnly label='read only' />
        </React.Fragment>
      )
    },

    defaultChecked: {
      header    : 'Default Checked',
      subheader : 'A checkbox can be checked by default',
      content   : (
        <React.Fragment>
          <Checkbox defaultChecked label='default checked' />
        </React.Fragment>
      )
    },

    indeterminate: {
      header    : 'Indeterminate',
      subheader : 'A checkbox can be indeterminate',
      content   : (
        <React.Fragment>
          <Checkbox defaultIndeterminate label='Indeterminate' />
        </React.Fragment>
      )
    },

    disabled: {
      header    : 'Disabled',
      subheader : 'A checkbox can be disabled and read-only',
      content   : (
        <React.Fragment>
          <Checkbox disabled label='disabled' />
          <Checkbox toggle disabled label='disabled' />
        </React.Fragment>
      )
    }
  }
};
