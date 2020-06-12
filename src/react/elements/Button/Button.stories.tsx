import * as React from 'react';
import { Button } from './index';

import { text, boolean } from '@storybook/addon-knobs';

import { getBackgroundColor, getElementSize } from '../../stories';


export default { title: 'Elements/Button' };


/* --------
 * Stories
 * -------- */
export const button = () => {

  const content = text('Content', 'Click Me!');

  const disabled = boolean('Disabled', false);
  const flat = boolean('Flat', false);

  const appearance = getBackgroundColor('primary');
  const size = getElementSize();

  return (
    <Button
      appearance={appearance}
      disabled={disabled}
      flat={flat}
      content={content}
      size={size}
    />
  );

};
