import * as React from 'react';

import { AutoSpacer } from './';


export default { title: 'HOC/AutoSpacer', component: AutoSpacer };

export const autoSpacer = () => (
  <React.Fragment>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>

    <AutoSpacer minimumHeight={300} subtractHeight={30} subtractWidth={30}>
      {({ height }) => (
        <div style={{ backgroundColor: 'rebeccapurple', height }} />
      )}
    </AutoSpacer>
  </React.Fragment>
);
