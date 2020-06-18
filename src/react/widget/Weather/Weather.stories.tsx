import * as React from 'react';

import Weather from './Weather';


export default { title: 'Widget/Weather', component: Weather };

export const weatherWidget = () => (
  <Weather
    textAlign={'center'}
    showTemperature
    openWeatherMapAPI={'66969c294b2ab48f12b407bdd6a4280c'}
    language={'it'}
  />
);
