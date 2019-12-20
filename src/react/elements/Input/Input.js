import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import CurrencyInput from 'react-currency-input';
import InputMask from 'react-input-mask';
import TextareaAutosize from 'react-textarea-autosize';

import { isValidString } from '@appbuckets/rabbit';
import _ from 'lodash';

import {
  createShorthandFactory,
  getElementType,
  getUnhandledProps,
  partitionHTMLProps,
  partitionFieldProps
} from '../../lib';

import Field from '../Field';

class Input extends PureComponent {

  /** Define Component PropTypes */
  static propTypes = {

    /** Show Mask on Maskered Input */
    alwaysShowMask: PropTypes.bool,

    /** Currency Input */
    currency: PropTypes.bool,

    /** Disabled style */
    disabled: PropTypes.bool,

    /** Mask the Input Field */
    mask: PropTypes.string,

    /** Char to use while Masking */
    maskChar: PropTypes.string,

    /** Max Rows for TextArea input */
    maxRows: PropTypes.number,

    /** Min Rows for TextArea input */
    minRows: PropTypes.number,

    /**
     * Called on Input Blur
     *
     * @param {ChangeEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and a proposed value.
     */
    onBlur: PropTypes.func,

    /**
     * Called on change.
     *
     * @param {ChangeEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and a proposed value.
     */
    onChange: PropTypes.func,

    /** Set the Field as Required */
    required: PropTypes.bool,

    /** Tab Index for Input Element */
    tabIndex: PropTypes.number,

    /** Render input as Text Area */
    textarea: PropTypes.bool,

    /** The input type to use */
    type: PropTypes.string
  }

  /** Set Default Property */
  static defaultProps = {
    maxRows : 8,
    minRows : 2,
    type    : 'text'
  }

  /** Create Input Ref */
  inputRef = createRef()

  /**
   * TabIndex will be computed
   * using disabled props and/or
   * the original tab index property
   * if exists. A disabled button will
   * have tabIndex = -1
   */
  getTabIndex = () => {
    const { disabled, tabIndex } = this.props;

    if (!_.isNil(tabIndex)) return tabIndex;
    if (disabled) return -1;
    return null;
  }

  computeCurrencyValue = (rawValue) => {
    /** Assert value exists */
    const value = rawValue || 0;

    if (typeof value === 'number') {
      return value;
    }

    const regExp = new RegExp('[^0-9-,]', 'g');
    const unformatted = parseFloat(
      (`${value}`)
        .replace(regExp, '')  // Strip any invalid char
        .replace(',', '.')    // Convert to conventional dot for decimals
    );

    return !Number.isNaN(unformatted) ? unformatted : 0;
  }

  /**
   * Build an Handle Change for Element
   *
   * @param {React.SyntheticEvent} e
   */
  handleChange = (e) => {
    const { currency } = this.props;

    const value = _.get(e, 'target.value');

    _.invoke(this.props, 'onChange', e, {
      ...this.props,
      value: currency ? this.computeCurrencyValue(value) : value
    });
  }

  handleBlur = (e) => {
    const { currency } = this.props;

    const value = _.get(e, 'target.value');

    _.invoke(this.props, 'onBlur', e, {
      ...this.props,
      value: currency ? this.computeCurrencyValue(value) : value
    });
  }

  /**
   * Partition Props,
   * to get HTML Input props
   * and all other props to
   * append to container
   */
  partitionProps = () => {
    const { disabled, type, required } = this.props;

    const tabIndex = this.getTabIndex();
    const unhandled = getUnhandledProps(Input, this.props);
    const [htmlInputProps, rawRest] = partitionHTMLProps(unhandled);
    const [fieldProps, rest] = partitionFieldProps(rawRest);

    return [
      {
        ...htmlInputProps,
        disabled,
        type,
        tabIndex,
        required,
        onChange : this.handleChange,
        onBlur   : this.handleBlur,
        ref      : this.inputRef
      },
      fieldProps,
      rest
    ];
  }

  /** Render Input Component */
  renderInput(rest, htmlInputProps) {
    /** Check if Input is Maskered */
    const { mask, maskChar, alwaysShowMask, textarea, type, currency } = this.props;

    if (isValidString(mask)) {
      return (
        <InputMask
          {...rest}
          type={type || 'text'}
          alwaysShowMask={alwaysShowMask}
          mask={mask}
          maskChar={maskChar}
          {...htmlInputProps}
        />
      );
    }

    if (textarea) {
      /** Get min and Max Rows Props */
      const { maxRows, minRows } = this.props;

      return (
        <TextareaAutosize
          {...rest}
          {...htmlInputProps}
          maxRows={maxRows}
          minRows={minRows}
        />
      );
    }

    if (currency) {
      return (
        <CurrencyInput
          {...rest}
          {...htmlInputProps}
          selectAllOnFocus
          decimalSeparator=','
          thousandSeparator='.'
          precision='2'
        />
      );
    }

    return <input {...rest} type={type || 'text'} {...htmlInputProps} />;
  }

  /** Render Component Function */
  render() {

    const { disabled, required } = this.props;

    const [
      htmlInputProps,
      rawFieldProps,
      rest
    ] = this.partitionProps();

    const fieldProps = {
      ...rawFieldProps,
      disabled,
      required
    };

    const ElementType = getElementType(Input, this.props);

    return (
      <Field {...fieldProps} form input as={ElementType}>
        {this.renderInput(rest, htmlInputProps)}
      </Field>
    );
  }

}

Input.create = createShorthandFactory(Input, type => ({ type }));

export default Input;
