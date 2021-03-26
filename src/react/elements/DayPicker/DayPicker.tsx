import * as React from 'react';
import clsx from 'clsx';

import 'react-day-picker/src/style.css';
import { DayModifiers } from 'react-day-picker';
import ReactDayPicker from 'react-day-picker/DayPicker';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import {
  splitFieldProps,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';

import { Button } from '../Button';
import { Input, InputProps } from '../Input';

import { Modal } from '../../modules/Modal';
import { Popup } from '../../modules/Popup';

import { DayPickerProps, ParsableDate } from './DayPicker.types';


dayjs.extend(customParseFormat);


/* --------
 * Component Declare
 * -------- */
type DayPickerComponent = React.FunctionComponent<DayPickerProps<ParsableDate>>;


/* --------
 * Component Render
 * -------- */
const DayPicker: DayPickerComponent = (props) => {

  const {
    className,
    rest: {
      /** Strict DayPicker Props */
      clearable,
      clearButton,
      closeOnDayPicked,
      date: userDefinedDate,
      dateFormat,
      defaultDate,
      defaultOpen,
      onCalendarClose,
      onCalendarOpen,
      onDayChange,
      onInputChange,
      open: userDefinedOpen,
      showInputMask,
      trigger,
      triggerProps,
      type,

      /** Shared Field Props */
      disabled,
      readOnly,
      required,

      /** Strict DayPicker Props */
      fixedWeeks: userDefinedFixedWeeks,
      onTodayButtonClick,
      todayButton,

      /** Strip useless props */
      ref,

      /** All other DayPicker Props Props */
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ , allRest, inputState ] = useSplitStateClassName(rawRest);
  const [ restFieldProps, restDayPickerProps ] = splitFieldProps(allRest);


  /* --------
   * Auto Controlled Component State
   * -------- */
  const [ rawDate, trySetRawDate ] = useAutoControlledValue(null, {
    prop       : userDefinedDate,
    defaultProp: defaultDate
  });

  const [ open, trySetOpen ] = useAutoControlledValue(false, {
    prop       : userDefinedOpen,
    defaultProp: defaultOpen
  });


  /* --------
   * Date Parsing and Formatting
   * -------- */
  const selectedDate = React.useMemo<{ object: dayjs.Dayjs | null, formatted: string }>(
    () => {
      if (rawDate === null || rawDate === undefined) {
        return { object: null, formatted: '' };
      }

      const casted = typeof rawDate === 'number' || typeof rawDate === 'string' || rawDate instanceof Date
        ? dayjs(rawDate)
        : dayjs(rawDate, dateFormat);

      if (!casted.isValid()) {
        return { object: null, formatted: '' };
      }

      return { object: casted, formatted: casted.format(dateFormat) };
    },
    [ rawDate, dateFormat ]
  );

  const [ inputValue, setInputValue ] = React.useState(selectedDate.formatted ?? '');


  /* --------
   * Build Props Object used to pass to Event
   * -------- */
  const propsForEvent: DayPickerProps = {
    ...props,
    date     : selectedDate.object?.toDate() ?? null,
    timestamp: selectedDate.object?.valueOf() ?? null
  };


  /* --------
   * Build the Input Hint object
   * -------- */
  const inputHint = React.useMemo<{ mask: string | undefined, placeholder: string }>(
    () => ({
      mask       : showInputMask && dateFormat
        ? dateFormat.replace(/([^/\s])/g, '9')
        : undefined,
      placeholder: dateFormat
        ? dateFormat.replace(/([^/\s])/g, '-')
        : ''
    }),
    [ showInputMask, dateFormat ]
  );


  /* --------
   * Component Handlers
   * -------- */
  const handleCalendarOpen = React.useCallback(
    () => {
      if (onCalendarOpen) {
        onCalendarOpen(null, propsForEvent);
      }
      trySetOpen(true);
    },
    [ onCalendarOpen, propsForEvent, trySetOpen ]
  );

  const handleCalendarClose = React.useCallback(
    () => {
      if (onCalendarClose) {
        onCalendarClose(null, propsForEvent);
      }
      trySetOpen(false);
    },
    [ onCalendarClose, propsForEvent, trySetOpen ]
  );

  const evalDayChange = React.useCallback(
    (value: string | Date, triggeredByInput: boolean) => {
      /** Build new Date Object */
      const newDate = triggeredByInput ? dayjs(value, dateFormat) : dayjs(value);
      const currTimestamp = selectedDate.object?.valueOf() ?? null;

      const newDateObject = newDate.isValid() ? newDate.toDate() : null;
      const newTimestamp = newDate.isValid() ? newDate.valueOf() : null;

      /** Check if date is changed */
      if (currTimestamp !== newTimestamp && onDayChange) {
        onDayChange(null, {
          ...propsForEvent,
          date     : newDate,
          timestamp: newTimestamp
        });
      }

      if (closeOnDayPicked) {
        handleCalendarClose();
      }

      if (!triggeredByInput) {
        setInputValue(newDate.isValid() ? newDate.format(dateFormat) : '');
      }

      trySetRawDate(newDateObject);
    },
    [
      dateFormat,
      selectedDate.object,
      onDayChange,
      closeOnDayPicked,
      trySetRawDate,
      propsForEvent,
      handleCalendarClose
    ]
  );

  const handleDayClick = React.useCallback(
    (day: Date, modifiers: DayModifiers) => {
      /** If calendar is disabled, or day is disabled, return */
      if (disabled || modifiers.disabled) {
        return;
      }
      /** Eval Day Change */
      evalDayChange(day, false);
    },
    [ disabled, evalDayChange ]
  );

  const handleInputChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>, inputProps: InputProps) => {
      /** Change Input Value */
      setInputValue(inputProps.value!);
      /** Trigger Handler */
      if (onInputChange) {
        onInputChange(e, inputProps);
      }
      /** Eval day Change */
      evalDayChange(inputProps.value!, true);
    },
    [ evalDayChange, onInputChange ]
  );

  const handleTodayButtonClick = React.useCallback(
    () => {
      evalDayChange(dayjs().toDate(), false);
    },
    [ evalDayChange ]
  );

  const handleClearDate = React.useCallback(
    () => {
      evalDayChange('', false);
    },
    [ evalDayChange ]
  );


  /** Build the element class list */
  const classes = clsx(
    'day-picker',
    className
  );


  /* --------
   * Build the Modal Trigger Memoized Element
   * -------- */
  const modalTrigger = React.useMemo(
    () => {
      if (type === 'input') {
        return undefined;
      }

      if (trigger) {
        return trigger;
      }

      return (
        <Button
          icon={'calendar'}
          content={selectedDate.formatted || inputHint.placeholder}
          {...triggerProps}
          disabled={disabled}
          onClick={handleCalendarOpen}
        />
      );
    },
    [ type, trigger, selectedDate.formatted, inputHint.placeholder, triggerProps, disabled, handleCalendarOpen ]
  );

  const calendarAddon = React.useMemo(
    () => {
      /** In Portal no addons could be defined */
      if (type === 'input') {
        return null;
      }

      /** Build clear Button */
      const clearButtonElement = clearable && Button.create(clearButton || 'Clear', {
        autoGenerateKey: false,
        defaultProps   : {
          size: 'small'
        },
        overrideProps  : {
          className: 'clear',
          disabled,
          onClick  : handleClearDate
        }
      });

      /** Build today button */
      const todayButtonElement = Button.create(todayButton, {
        autoGenerateKey: false,
        defaultProps   : {
          primary: true,
          size   : 'small'
        },
        overrideProps  : {
          className: 'today',
          disabled,
          onClick  : handleTodayButtonClick
        }
      });

      /** If no content, return */
      if (!clearButtonElement && !todayButtonElement) {
        return null;
      }

      return (
        <div className={'addons'}>
          {todayButtonElement}
          {clearButtonElement}
        </div>
      );
    },
    [ todayButton, clearButton, handleTodayButtonClick, handleClearDate, disabled, type, clearable ]
  );


  /* --------
   * Build the DayPicker Component
   * -------- */
  const dayPickerElement = (
    <React.Fragment>
      <ReactDayPicker
        // Component Props
        {...restDayPickerProps}
        fixedWeeks={userDefinedFixedWeeks ?? type === 'modal'}
        // Selected Days
        month={selectedDate.object?.toDate()}
        selectedDays={selectedDate.object?.toDate()}
        // Handlers
        onDayClick={handleDayClick}
        onTodayButtonClick={handleDayClick}
      />
      {calendarAddon}
    </React.Fragment>
  );


  /* --------
   * Return the Calendar as Input
   * -------- */
  if (type === 'input') {
    return (
      <Popup
        portalProps={{
          open
        }}
        onOpen={handleCalendarOpen}
        onClose={handleCalendarClose}
        basic={false}
        inverted={false}
        position={'bottom left'}
        openOn={[ 'focus' ]}
        trigger={(
          <Input
            {...inputState}
            {...restFieldProps}
            className={classes}
            clearable={clearable}
            masked={inputHint.mask ? {
              mask          : inputHint.mask,
              maskChar      : '-',
              alwaysShowMask: true
            } : undefined}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            value={inputValue}
            onChange={handleInputChange}
          />
        )}
      >
        {dayPickerElement}
      </Popup>
    );
  }

  return (
    <Modal
      className={classes}
      open={open}
      trigger={modalTrigger}
      content={dayPickerElement}
      onClose={handleCalendarClose}
    />
  );
};

DayPicker.displayName = 'DayPicker';

DayPicker.defaultProps = {
  closeOnDayPicked: true,
  dateFormat      : 'DD/MM/YYYY',
  showInputMask   : true,
  showOutsideDays : true,
  showWeekNumbers : true,
  type            : 'input'
};

export default DayPicker;
