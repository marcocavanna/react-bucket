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
  const fab = boolean('FAB', false);
  const loading = boolean('Loading', false);
  const inverted = boolean('Inverted', false);
  const flat = boolean('Flat', false);
  const full = boolean('Full', false);
  const rounded = boolean('Rounded', false);
  const withIcon = boolean(content ? 'With Icon' : 'As Icon', false);

  const appearance = getBackgroundColor('primary');
  const size = getElementSize();

  return (
    <Button
      fab={fab}
      appearance={appearance}
      disabled={disabled}
      inverted={inverted}
      loading={loading}
      flat={flat}
      content={content}
      size={size}
      rounded={rounded}
      full={full}
      icon={withIcon ? 'plus' : undefined}
    />
  );

};


export const buttonGroup = () => (
  <Button.Group
    buttons={[
      { key: 1, active: true, primary: true, icon: 'link', toggle: true },
      { key: 2, icon: 'trash', primary: true, toggle: true }
    ]}
  />
);
