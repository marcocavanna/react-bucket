import { ThemeOptions } from './BucketContext.types';


export const defaultBucketThemeConfig: ThemeOptions = {

  // ----
  // DayPicker Component
  // ----
  dayPicker: {
    closeOnDayPicked: true,
    dateFormat      : 'DD/MM/YYYY',
    showInputMask   : true,
    showOutsideDays : true,
    showWeekNumbers : true,
    type            : 'input'
  }

};
