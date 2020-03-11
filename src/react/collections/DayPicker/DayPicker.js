import React from 'react';
import PropTypes from 'prop-types';

import DayPickerComponent from 'react-day-picker/DayPicker';

import dayJS from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/it';

import _ from 'lodash';

import {
  AutoControlledComponent as Component,
  getUnhandledProps
} from '../../lib';

import Modal from '../../modules/Modal';
import Popup from '../../modules/Popup';
import Button from '../../elements/Button';
import Input from '../../elements/Input';

dayJS.locale('it');
dayJS.extend(customParseFormat);
dayJS.extend(relativeTime);

// eslint-disable-next-line react/require-optimization
class DayPicker extends Component {

  static propTypes = {

    /** Close Picker once a day has been selected */
    closeOnDayPicked: PropTypes.bool,

    /** Set the date */
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ]),

    /** Set the Date Format */
    dateFormat: PropTypes.string,

    /** Set the Starting Date */
    defaultDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ]),

    /** Set the default input value */
    defaultInputValue: PropTypes.string,

    /** Set default Open props for portal */
    defaultOpen: PropTypes.bool,

    /** Disable the Component */
    disabled: PropTypes.bool,

    /** Set disabled days */
    disabledDays: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.object
    ])),

    /** Get or Set the input value */
    inputValue: PropTypes.string,

    /** Number of Months to Display */
    numberOfMonths: PropTypes.number,

    /** On Input Blur Handler */
    onCalendarClose: PropTypes.func,

    /** On Input Focus Handler */
    onCalendarOpen: PropTypes.func,

    /** On Day Change Handler */
    onDayChange: PropTypes.func,

    /** On Input Change Handler */
    onInputChange: PropTypes.func,

    /** Set Controlled Open Props */
    open: PropTypes.bool,

    /** Set the Calendar Trigger Type */
    type: PropTypes.oneOf(['iconButton', 'input', 'modal'])
  }

  static defaultProps = {
    closeOnDayPicked : true,
    dateFormat       : 'DD/MM/YYYY',
    type             : 'input'
  }

  static autoControlledProps = ['date', 'inputValue', 'open']

  static monthName = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre'
  ]

  static weekDaysLong = [
    'Domenica',
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato'
  ]

  static weekDaysShort = [
    'Do',
    'Lu',
    'Ma',
    'Me',
    'Gi',
    'Ve',
    'Sa'
  ]

  static firstDayOfWeek = 1

  inputRef = React.createRef()

  buttonRef = React.createRef()

  constructor(props) {
    /** Init Father Constructor */
    super(props);

    const { defaultDate, date } = props;

    const startingDate = typeof defaultDate === 'number'
      ? dayJS(defaultDate)
      : typeof date === 'number'
        ? dayJS(date)
        : null;

    /** Set the State */
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      date         : startingDate ? startingDate.valueOf() : null,
      inputValue   : startingDate ? startingDate.format(props.dateFormat) : '',
      open         : false,
      selectedDays : startingDate ? startingDate.toDate() : null
    };

  }

  handleCalendarOpen = (e) => {
    /** Get the open state value */
    const {
      date,
      disabled,
      open,
      selectedDays
    } = this.state;

    if (disabled) {
      return;
    }

    /** Fire the original onCalendarOpen handler */
    _.invoke(this.props, 'onCalendarOpen', e, {
      ...this.props,
      open  : !open,
      value : date,
      date  : selectedDays
    });

    /** Open the DayPicker if is closed */
    if (!open) {
      this.trySetState({ open: true });
    }
  }

  handleCalendarClose = (e) => {
    /** Get the open state value */
    const {
      date,
      open,
      selectedDays
    } = this.state;

    /** Fire the original onCalendarClose handler */
    _.invoke(this.props, 'onCalendarClose', e, {
      ...this.props,
      open  : !open,
      value : date,
      date  : selectedDays
    });

    /** Close the DayPicker */
    if (open) {
      this.trySetState({ open: false });
    }
  }

  evalDayChange = (value, isInputTrigger) => {
    /** Get Type */
    const { closeOnDayPicked } = this.props;
    /** Get Last Date */
    const { date: lastDateValue, open } = this.state;
    /** Build the DayJS Object */
    const date = isInputTrigger ? dayJS(value, 'DD/MM/YYYY') : dayJS(value);
    /** Get the Date Timestamp */
    const dateTimestamp = date.isValid() ? date.valueOf() : null;
    const dateObject = date.isValid() ? date.toDate() : null;
    /** Trigger the DayChange Handler */
    if (lastDateValue !== dateTimestamp) {
      _.invoke(this.props, 'onDayChange', null, {
        ...this.props,
        value : dateTimestamp,
        date  : dateObject
      });
    }
    /** Set the New State */
    this.trySetState({
      /** If type is modal, close it */
      open       : closeOnDayPicked && !isInputTrigger ? false : open,
      date       : dateTimestamp,
      inputValue : isInputTrigger ? value : (date.isValid() ? date.format('DD/MM/YYYY') : '')
    }, {
      selectedDays: dateObject
    });
  }

  handleInputChange = (e, { value }) => {
    /** Check if component is disabled */
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    /** Get the open state value */
    const {
      date,
      open,
      selectedDays
    } = this.state;
    /** Trigger the onInputChange handler */
    _.invoke(this.props, 'onInputChange', e, {
      ...this.props,
      open  : !open,
      value : date,
      date  : selectedDays
    });
    /** Eval Date Change */
    this.evalDayChange(value, true);
  }

  handleDayClick = (value, modifiers = {}) => {
    /** Check if component is disabled */
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    if (modifiers.disabled) {
      return;
    }

    /** Eval Day Change */
    this.evalDayChange(value);
  }

  render() {

    /** Get Props */
    const {
      dateFormat,
      disabled,
      numberOfMonths,
      type,
      disabledDays
    } = this.props;

    /** Get State */
    const {
      inputValue,
      open,
      selectedDays
    } = this.state;

    /** Get Rest Props */
    const rest = getUnhandledProps(DayPicker, this.props);

    /** Calc the Placeholder */
    const placeholder = dateFormat.replace(/([^/])/g, '-');
    const inputMask = dateFormat.replace(/([^/])/g, '9');

    /** Init the DayPicker */
    const dayPickerElement = (
      <DayPickerComponent
        // Generic Behaviour Props
        showOutsideDays
        showWeekNumbers
        labels={{
          nextMonth     : 'Prossimo Mese',
          previousMonth : 'Mese Precedente'
        }}
        fixedWeeks={type === 'modal'}
        numberOfMonths={numberOfMonths}
        todayButton='Oggi'

        // Disabled Days
        disabledDays={disabledDays}

        // Localization
        months={DayPicker.monthName}
        weekdaysLong={DayPicker.weekDaysLong}
        weekdaysShort={DayPicker.weekDaysShort}
        firstDayOfWeek={DayPicker.firstDayOfWeek}

        // Selected Days
        month={selectedDays}
        selectedDays={selectedDays}

        // Handler
        onDayClick={this.handleDayClick}
        onTodayButtonClick={this.handleDayClick}
      />
    );

    /** Return the Calendar Input Component */
    if (type === 'input') {
      return (
        <React.Fragment>
          {/* Trigger Input */}
          <Popup
            open={open}
            basic={false}
            inverted={false}
            position='bottom left'
            on='focus'
            trigger={(
              <Input
                {...rest}
                disabled={disabled}
                mask={inputMask}
                maskChar='-'
                placeholder={placeholder}
                value={inputValue}
                onChange={this.handleInputChange}
                onClick={this.handleCalendarOpen}
              />
            )}
            content={dayPickerElement}
            onOutsideClick={this.handleCalendarClose}
          />
        </React.Fragment>
      );
    }

    /** Return the Modal Trigger Component */
    return (
      <Modal
        autosized
        open={open}
        trigger={(
          <Button
            icon='calendar'
            {...rest}
            disabled={disabled}
            content={type === 'iconButton' ? null : inputValue || placeholder}
            onClick={this.handleCalendarOpen}
          />
        )}
        onClose={this.handleCalendarClose}
      >
        <Modal.Content content={dayPickerElement} />
      </Modal>
    );
  }

}

export default DayPicker;
