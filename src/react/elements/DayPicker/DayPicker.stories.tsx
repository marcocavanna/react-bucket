import * as React from 'react';

import { DayPicker } from './index';


export default { title: 'Elements/DayPicker', component: DayPicker };

export const baseDayPicker = () => {

  return (
    <DayPicker
      clearable
      triggerProps={{
        content: undefined,
        fab    : true,
        primary: true
      }}
      type={'modal'}
      todayButton={'Oggi'}
    />
  );
};
