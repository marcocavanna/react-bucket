'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var splitFieldProps = require('../../lib/splitFieldProps.js');
require('../Button/ButtonGroup.js');
var Popup = require('../../modules/Popup/Popup.js');
var Button = require('../Button/Button.js');
var useAutoControlledValue = require('../../hooks/useAutoControlledValue.js');
require('react-day-picker/src/style.css');
var ReactDayPicker = require('react-day-picker/DayPicker');
var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');
var Input = require('../Input/Input.js');
require('../../modules/Modal/Modal.context.js');
var Modal = require('../../modules/Modal/Modal.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);
var ReactDayPicker__default = /*#__PURE__*/ _interopDefaultLegacy(
  ReactDayPicker
);
var dayjs__default = /*#__PURE__*/ _interopDefaultLegacy(dayjs);
var customParseFormat__default = /*#__PURE__*/ _interopDefaultLegacy(
  customParseFormat
);

dayjs__default['default'].extend(customParseFormat__default['default']);
/* --------
 * Component Render
 * -------- */
var DayPicker = function (props) {
  var _a, _b, _c, _d, _e, _f, _g;
  var _h = customHook.useSharedClassName(props),
    className = _h.className,
    _j = _h.rest,
    /** Strict DayPicker Props */
    clearable = _j.clearable,
    clearButton = _j.clearButton,
    closeOnDayPicked = _j.closeOnDayPicked,
    userDefinedDate = _j.date,
    dateFormat = _j.dateFormat,
    defaultDate = _j.defaultDate,
    defaultOpen = _j.defaultOpen,
    onCalendarClose = _j.onCalendarClose,
    onCalendarOpen = _j.onCalendarOpen,
    onDayChange = _j.onDayChange,
    onInputChange = _j.onInputChange,
    userDefinedOpen = _j.open,
    showInputMask = _j.showInputMask,
    trigger = _j.trigger,
    triggerProps = _j.triggerProps,
    type = _j.type,
    /** Shared Field Props */
    disabled = _j.disabled,
    readOnly = _j.readOnly,
    required = _j.required,
    /** Strict DayPicker Props */
    userDefinedFixedWeeks = _j.fixedWeeks,
    todayButton = _j.todayButton,
    /** All other DayPicker Props Props */
    rawRest = _tslib.__rest(_j, [
      'clearable',
      'clearButton',
      'closeOnDayPicked',
      'date',
      'dateFormat',
      'defaultDate',
      'defaultOpen',
      'onCalendarClose',
      'onCalendarOpen',
      'onDayChange',
      'onInputChange',
      'open',
      'showInputMask',
      'trigger',
      'triggerProps',
      'type',
      'disabled',
      'readOnly',
      'required',
      'fixedWeeks',
      'onTodayButtonClick',
      'todayButton',
      'ref',
    ]);
  var _k = customHook.useSplitStateClassName(rawRest),
    allRest = _k[1],
    inputState = _k[2];
  var _l = splitFieldProps(allRest),
    restFieldProps = _l[0],
    restDayPickerProps = _l[1];
  /* --------
   * Auto Controlled Component State
   * -------- */
  var _m = useAutoControlledValue.useAutoControlledValue(null, {
      prop: userDefinedDate,
      defaultProp: defaultDate,
    }),
    rawDate = _m[0],
    trySetRawDate = _m[1];
  var _o = useAutoControlledValue.useAutoControlledValue(false, {
      prop: userDefinedOpen,
      defaultProp: defaultOpen,
    }),
    open = _o[0],
    trySetOpen = _o[1];
  /* --------
   * Date Parsing and Formatting
   * -------- */
  var selectedDate = React.useMemo(
    function () {
      if (rawDate === null || rawDate === undefined) {
        return { object: null, formatted: '' };
      }
      var casted =
        typeof rawDate === 'number' || rawDate instanceof Date
          ? dayjs__default['default'](rawDate)
          : dayjs__default['default'](rawDate, dateFormat);
      if (!casted.isValid()) {
        return { object: null, formatted: '' };
      }
      return { object: casted, formatted: casted.format(dateFormat) };
    },
    [rawDate, dateFormat]
  );
  var _p = React.useState(
      (_a = selectedDate.formatted) !== null && _a !== void 0 ? _a : ''
    ),
    inputValue = _p[0],
    setInputValue = _p[1];
  /* --------
   * Build Props Object used to pass to Event
   * -------- */
  var propsForEvent = _tslib.__assign(_tslib.__assign({}, props), {
    date:
      (_c =
        (_b = selectedDate.object) === null || _b === void 0
          ? void 0
          : _b.toDate()) !== null && _c !== void 0
        ? _c
        : null,
    timestamp:
      (_e =
        (_d = selectedDate.object) === null || _d === void 0
          ? void 0
          : _d.valueOf()) !== null && _e !== void 0
        ? _e
        : null,
  });
  /* --------
   * Build the Input Hint object
   * -------- */
  var inputHint = React.useMemo(
    function () {
      return {
        mask:
          showInputMask && dateFormat
            ? dateFormat.replace(/([^/\s])/g, '9')
            : undefined,
        placeholder: dateFormat ? dateFormat.replace(/([^/\s])/g, '-') : '',
      };
    },
    [showInputMask, dateFormat]
  );
  /* --------
   * Component Handlers
   * -------- */
  var handleCalendarOpen = React.useCallback(
    function () {
      if (onCalendarOpen) {
        onCalendarOpen(null, propsForEvent);
      }
      trySetOpen(true);
    },
    [onCalendarOpen, propsForEvent, trySetOpen]
  );
  var handleCalendarClose = React.useCallback(
    function () {
      if (onCalendarClose) {
        onCalendarClose(null, propsForEvent);
      }
      trySetOpen(false);
    },
    [onCalendarClose, propsForEvent, trySetOpen]
  );
  var evalDayChange = React.useCallback(
    function (value, triggeredByInput) {
      var _a, _b;
      /** Build new Date Object */
      var newDate = triggeredByInput
        ? dayjs__default['default'](value, dateFormat)
        : dayjs__default['default'](value);
      var currTimestamp =
        (_b =
          (_a = selectedDate.object) === null || _a === void 0
            ? void 0
            : _a.valueOf()) !== null && _b !== void 0
          ? _b
          : null;
      var newDateObject = newDate.isValid() ? newDate.toDate() : null;
      var newTimestamp = newDate.isValid() ? newDate.valueOf() : null;
      /** Check if date is changed */
      if (currTimestamp !== newTimestamp && onDayChange) {
        onDayChange(
          null,
          _tslib.__assign(_tslib.__assign({}, propsForEvent), {
            date: newDate,
            timestamp: newTimestamp,
          })
        );
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
      handleCalendarClose,
    ]
  );
  var handleDayClick = React.useCallback(
    function (day, modifiers) {
      /** If calendar is disabled, or day is disabled, return */
      if (disabled || modifiers.disabled) {
        return;
      }
      /** Eval Day Change */
      evalDayChange(day, false);
    },
    [disabled, evalDayChange]
  );
  var handleInputChange = React.useCallback(
    function (e, inputProps) {
      /** Change Input Value */
      setInputValue(inputProps.value);
      /** Trigger Handler */
      if (onInputChange) {
        onInputChange(e, inputProps);
      }
      /** Eval day Change */
      evalDayChange(inputProps.value, true);
    },
    [evalDayChange, onInputChange]
  );
  var handleTodayButtonClick = React.useCallback(
    function () {
      evalDayChange(dayjs__default['default']().toDate(), false);
    },
    [evalDayChange]
  );
  var handleClearDate = React.useCallback(
    function () {
      evalDayChange('', false);
    },
    [evalDayChange]
  );
  /** Build the element class list */
  var classes = clsx__default['default']('day-picker', className);
  /* --------
   * Build the Modal Trigger Memoized Element
   * -------- */
  var modalTrigger = React.useMemo(
    function () {
      if (type === 'input') {
        return undefined;
      }
      if (trigger) {
        return trigger;
      }
      return React.createElement(
        Button,
        _tslib.__assign(
          {
            icon: 'calendar',
            content: selectedDate.formatted || inputHint.placeholder,
          },
          triggerProps,
          { disabled: disabled, onClick: handleCalendarOpen }
        )
      );
    },
    [
      type,
      trigger,
      selectedDate.formatted,
      inputHint.placeholder,
      triggerProps,
      disabled,
      handleCalendarOpen,
    ]
  );
  var calendarAddon = React.useMemo(
    function () {
      /** In Portal no addons could be defined */
      if (type === 'input') {
        return null;
      }
      /** Build clear Button */
      var clearButtonElement =
        clearable &&
        Button.create(clearButton || 'Clear', {
          autoGenerateKey: false,
          defaultProps: {
            size: 'small',
          },
          overrideProps: {
            className: 'clear',
            disabled: disabled,
            onClick: handleClearDate,
          },
        });
      /** Build today button */
      var todayButtonElement = Button.create(todayButton, {
        autoGenerateKey: false,
        defaultProps: {
          primary: true,
          size: 'small',
        },
        overrideProps: {
          className: 'today',
          disabled: disabled,
          onClick: handleTodayButtonClick,
        },
      });
      /** If no content, return */
      if (!clearButtonElement && !todayButtonElement) {
        return null;
      }
      return React.createElement(
        'div',
        { className: 'addons' },
        todayButtonElement,
        clearButtonElement
      );
    },
    [
      todayButton,
      clearButton,
      handleTodayButtonClick,
      handleClearDate,
      disabled,
      type,
      clearable,
    ]
  );
  /* --------
   * Build the DayPicker Component
   * -------- */
  var dayPickerElement = React.createElement(
    React.Fragment,
    null,
    React.createElement(
      ReactDayPicker__default['default'],
      // Component Props
      _tslib.__assign({}, restDayPickerProps, {
        fixedWeeks:
          userDefinedFixedWeeks !== null && userDefinedFixedWeeks !== void 0
            ? userDefinedFixedWeeks
            : type === 'modal',
        // Selected Days
        month:
          (_f = selectedDate.object) === null || _f === void 0
            ? void 0
            : _f.toDate(),
        selectedDays:
          (_g = selectedDate.object) === null || _g === void 0
            ? void 0
            : _g.toDate(),
        // Handlers
        onDayClick: handleDayClick,
        onTodayButtonClick: handleDayClick,
      })
    ),
    calendarAddon
  );
  /* --------
   * Return the Calendar as Input
   * -------- */
  if (type === 'input') {
    return React.createElement(
      Popup,
      {
        portalProps: {
          open: open,
        },
        onOpen: handleCalendarOpen,
        onClose: handleCalendarClose,
        basic: false,
        inverted: false,
        position: 'bottom left',
        openOn: ['focus'],
        trigger: React.createElement(
          Input,
          _tslib.__assign({}, inputState, restFieldProps, {
            className: classes,
            clearable: clearable,
            masked: inputHint.mask
              ? {
                  mask: inputHint.mask,
                  maskChar: '-',
                  alwaysShowMask: true,
                }
              : undefined,
            disabled: disabled,
            readOnly: readOnly,
            required: required,
            value: inputValue,
            onChange: handleInputChange,
          })
        ),
      },
      dayPickerElement
    );
  }
  return React.createElement(Modal, {
    className: classes,
    open: open,
    trigger: modalTrigger,
    content: dayPickerElement,
    onClose: handleCalendarClose,
  });
};
DayPicker.displayName = 'DayPicker';
DayPicker.defaultProps = {
  closeOnDayPicked: true,
  dateFormat: 'DD/MM/YYYY',
  showInputMask: true,
  showOutsideDays: true,
  showWeekNumbers: true,
  type: 'input',
};

module.exports = DayPicker;
//# sourceMappingURL=DayPicker.js.map
