import * as React from 'react';
import clsx from 'clsx';

import { BlockPicker, CirclePicker, ColorChangeHandler, TwitterPicker } from 'react-color';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';
import Popup from '../../modules/Popup/Popup';


import {
  splitFieldProps,
  useSharedClassName
} from '../../lib';
import { StrictFieldProps } from '../Field';
import Field from '../Field/Field';
import Item from '../Item/Item';

import { ColorPickerProps } from './ColorPicker.types';


/* --------
 * Component Declare
 * -------- */
type ColorPickerComponent = React.FunctionComponent<ColorPickerProps>;


/* --------
 * Component Render
 * -------- */
const ColorPicker: ColorPickerComponent = (props) => {

  const {
    className,
    rest: {
      clearable,
      color       : userDefinedDefaultColor,
      colors,
      disabled,
      defaultColor: userDefinedColor,
      defaultOpen : userDefinedDefaultOpen,
      onClick,
      onChange,
      onPickerClose,
      onPickerOpen,
      open        : userDefinedOpen,
      pickerType,
      placeholder,
      readOnly,
      required,
      showColorValue,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Split field props from rest */
  const [ userDefinedFieldProps, rest ] = splitFieldProps({
    ...rawRest,
    disabled,
    readOnly
  });


  // ----
  // State Management
  // ----
  const [ color, trySetColor ] = useAutoControlledValue(undefined, {
    defaultProp: userDefinedDefaultColor,
    prop       : userDefinedColor
  });

  const [ open, trySetOpen ] = useAutoControlledValue(false, {
    defaultProp: userDefinedDefaultOpen,
    prop       : userDefinedOpen
  });


  // ----
  // Component Handlers
  // ----

  const handlePickerOpen = React.useCallback(
    () => {
      if (disabled || readOnly) {
        return;
      }

      if (onPickerOpen) {
        onPickerOpen();
      }

      trySetOpen(true);
    },
    [ onPickerOpen, trySetOpen, disabled, readOnly ]
  );

  const handlePickerClose = React.useCallback(
    () => {
      if (onPickerClose) {
        onPickerClose();
      }

      trySetOpen(false);
    },
    [ onPickerClose, trySetOpen ]
  );

  const handleRemoveColor = () => {
    /** Call the User Defined Handler */
    if (typeof onChange === 'function') {
      onChange(null, {
        ...props,
        color: null
      });
    }

    /** Try to set the color */
    trySetColor(null);

    /** Close the Popup */
    handlePickerClose();
  };

  const handleChangeColorCompleted: ColorChangeHandler = (newColor) => {
    /** Call the User Defined Handler */
    if (typeof onChange === 'function') {
      onChange(null, {
        ...props,
        color: newColor.hex
      });
    }

    /** Try to set the color */
    trySetColor(newColor.hex);

    /** Close the Popup */
    handlePickerClose();
  };


  // ----
  // Memoized Elements
  // ----
  const avatarElement = React.useMemo(
    () => (
      <Item.Avatar
        type={'square'}
        size={'small'}
        className={'color-preview'}
        style={color ? {
          backgroundColor: color
        } : {}}
      />
    ),
    [ color ]
  );

  const contentElement = React.useMemo(
    () => showColorValue && (
      <Item.Content header={color || placeholder || 'No Color'} />
    ),
    [ color, placeholder, showColorValue ]
  );

  const toolsElement = (() => clearable && color && (
    <Item.Tools
      tools={[
        {
          key    : 0,
          icon   : 'times',
          onClick: handleRemoveColor
        }
      ]}
    />
  ))();


  /** Build the element class list */
  const classes = clsx(
    { open, disabled, readOnly },
    'color-picker',
    className
  );

  /** Build Field Props */
  const fieldProps: StrictFieldProps = {
    disabled,
    readOnly,
    required,
    ...userDefinedFieldProps,
    contentType: 'color'
  };

  // ----
  // Readonly Element return a Plain Item
  // ----
  if (readOnly || disabled) {
    return (
      <Field {...fieldProps}>
        <Item centered {...rest} className={classes}>
          {avatarElement}
          {contentElement}
        </Item>
      </Field>
    );
  }


  // ----
  // Build the Picker Element
  // ----
  const pickerElement = (() => {
    switch (pickerType) {
      case 'block':
        return (
          <BlockPicker
            triangle={'hide'}
            color={color ?? undefined}
            colors={colors}
            onChangeComplete={handleChangeColorCompleted}
          />
        );

      case 'circle':
        return (
          <CirclePicker
            color={color ?? undefined}
            colors={colors}
            onChangeComplete={handleChangeColorCompleted}
          />
        );

      case 'twitter':
        return (
          <TwitterPicker
            triangle={'hide'}
            color={color ?? undefined}
            colors={colors}
            onChangeComplete={handleChangeColorCompleted}
          />
        );

      default:
        return null;
    }
  })();


  // ----
  // Return the Component with Picker
  // ----
  return (
    <Field {...fieldProps}>
      <Item centered {...rest} className={classes}>
        <Popup
          className={'colors'}
          basic
          inverted={false}
          position={'bottom right'}
          openOn={[ 'click' ]}
          portalProps={{
            open: open && !disabled && !readOnly
          }}
          content={pickerElement}
          trigger={avatarElement}
          onOpen={handlePickerOpen}
          onClose={handlePickerClose}
        />
        {contentElement}
        {toolsElement}
      </Item>
    </Field>
  );
};

ColorPicker.displayName = 'ColorPicker';

ColorPicker.defaultProps = {
  pickerType    : 'block',
  showColorValue: true
};

export default ColorPicker;
