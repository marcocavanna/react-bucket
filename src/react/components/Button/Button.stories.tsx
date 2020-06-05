import * as React from 'react';
import Button from './Button';

import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default { title: 'Button component', decorators: [withKnobs()] };

/**
 * Show a Normal Button
 */
export const button = () => {
  const content = text('Content', 'Click Me!');
  return <Button content={content} onClick={action('clicked')} />;
};
