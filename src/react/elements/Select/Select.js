import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import CreatableSelect from 'react-select/creatable';

import _ from 'lodash';

import {
  getElementType,
  partitionFieldProps
} from '../../lib';

import Field from '../Field';

class Select extends PureComponent {

  /** Define Component PropTypes */
  static propTypes = {
    /** Set if Select is Async type */
    async: PropTypes.bool,

    /** Set if the Value is Clearable */
    clearable: PropTypes.bool,

    /** Set if Select is Creatable */
    creatable: PropTypes.bool,

    /** Disabled Field */
    disabled: PropTypes.bool,

    /** Set if must show loader */
    loading: PropTypes.bool,

    /**
     * Fire on Select Blur
     *
     * @param {SyntethicEvent} event The Change Event
     * @param {object} props All props
     */
    onBlur: PropTypes.func,

    /**
     * Fire on Select Change
     *
     * @param {any} value The Selected Value
     * @param {object} props All props plus value and action
     */
    onChange: PropTypes.func,

    /** Select Options */
    options: PropTypes.arrayOf(PropTypes.object),

    /** Set field as required */
    required: PropTypes.bool,

    /** Input Tab Index */
    tabIndex: PropTypes.number
  }

  static defaultProps = {
    clearable : true,
    options   : []
  }

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

  /** Build a Handler for onChange function */
  handleChange = (value, { action }) => {
    _.invoke(this.props, 'onChange', value, { ...this.props, value, action });
  }

  handleBlur = (e) => {
    _.invoke(this.props, 'onBlur', e, this.props);
  }

  render() {

    const {
      async,
      clearable,
      creatable,
      disabled,
      loading,
      options
    } = this.props;

    const tabIndex = this.getTabIndex();
    const [fieldProps, rest] = partitionFieldProps(this.props);

    const ElementType = getElementType(Select, this.props);

    const SelectElement = !async && !creatable
      ? ReactSelect
      : !async && creatable
        ? CreatableSelect
        : async && !creatable
          ? AsyncSelect
          : AsyncCreatableSelect;

    return (
      <Field form input as={ElementType} {...fieldProps}>
        <SelectElement
          {...rest}
          className='select'
          classNamePrefix='bucket'
          isClearable={clearable}
          isDisabled={disabled}
          isLoading={loading}
          options={options}
          tabIndex={tabIndex}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
      </Field>
    );
  }
}

export default Select;
