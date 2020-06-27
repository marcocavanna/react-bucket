import * as React from 'react';

import Weather from './Weather';


export default { title: 'Widget/Weather', component: Weather };

export const weatherWidget = () => (
  <Weather
    textAlign={'center'}
    showTemperature
    openWeatherMapAPI={'YOUR-TOKEN'}
    language={'it'}
  />
);
