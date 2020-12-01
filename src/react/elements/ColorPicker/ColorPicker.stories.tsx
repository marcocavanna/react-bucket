import * as React from 'react';
import ColorPickerComponent from './ColorPicker';


export default { title: 'Elements/Color Picker', component: ColorPickerComponent };


export const ColorPicker = () => {
  return (
    <ColorPickerComponent
      disabled
      label={'Color'}
      placeholder={'Choose Color'}
    />
  );
};
