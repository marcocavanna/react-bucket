import * as React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';

import { Header } from './index';


export default { title: 'Elements/Header', decorators: [ withKnobs() ] };


/* --------
 * Stories
 * -------- */
export const simpleHeader = () => {

  const content = text('Content', 'I am the Header Content');
  const subheader = text('Subheader', 'And i am a Subheader');

  return (
    <Header
      content={content}
      subheader={subheader}
      textColor={'primary'}
      textAlign={'center'}
    />
  );

};
