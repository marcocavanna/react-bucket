import React from 'react';
import ReactDOM from 'react-dom';

import { isTouch } from '@appbuckets/rabbit';

import '../src/scss/react-bucket.scss';

import App from './app';

/**
 * Check if Device is not Touch
 * and append the right class
 * to the html element
 */
if (!isTouch()) {
  document.documentElement.classList.add('no-touch');
}
else {
  document.documentElement.classList.add('with-touch');
}

/**
 * Render the App
 */
ReactDOM.render(
  <App />,
  document.getElementById('app-root')
);
