import * as React from 'react'

export interface DayPickerProps extends StrictDayPickerProps {
  [key: string]: any
}

export interface StrictDayPickerProps {
  /** Close the Date Picker once a day has been selected */
  closeOnDayPicked?: boolean

  /** Set the current DayPicker Date */
  date?: string | number | Date

  /** Set the Date Format */
  dateFormat?: string

  /** Set the Default Starting Date */
  defaultDate?: string | number | Date

  /** Set the Default Input Value */
  defaultInputValue?: string

  /** Set the Default Open State */
  defaultOpen?: boolean

  /** Disable the Calendar */
  disabled?: boolean

  /** Set the input Value */
  inputValue?: string

  /** Set the number of months to display */
  numberOfMonths?: number

  /** On Calendar Close Handler */
  onCalendarClose?: (e: React.SyntheticEvent, props: DayPickerHandlerProps) => void

  /** On Calendar Open Handler */
  onCalendarOpen?: (e: React.SyntheticEvent, props: DayPickerHandlerProps) => void

  /** On Day Change Handler */
  onDayChange?: (nothing: null, props: DayPickerHandlerProps) => void

  /** On Input change Handler */
  onInputChange?: (e: React.SyntheticEvent, props: DayPickerHandlerProps) => void

  /** Open state for Calendar */
  open?: boolean

  /** Type of Calendar */
  type: 'input' | 'modal'
}

declare interface DayPickerHandlerProps extends StrictDayPickerProps {
  /** Open Value */
  open: boolean
  /** Current Value as Timestamp */
  value: number
  /** Current Value as Date */
  date: Date
}

interface DayPickerComponent extends React.StatelessComponent<DayPickerProps> { }

declare const DayPicker: DayPickerComponent

export default DayPicker
