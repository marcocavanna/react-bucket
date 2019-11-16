import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import _ from 'lodash';

import {
  getElementType,
  partitionFieldProps
} from '../../lib';

import Field from '../Field';

class Select extends PureComponent {

  /** Define Component PropTypes */
  static propTypes = {
    /** Set if the Value is Clearable */
    clearable: PropTypes.bool,

    /** Disabled Field */
    disabled: PropTypes.bool,

    /** Set if must show loader */
    loading: PropTypes.bool,

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

  /** Create the Select Ref */
  selectRef = createRef()

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
      clearable,
      disabled,
      loading,
      options
    } = this.props;

    const tabIndex = this.getTabIndex();
    const [fieldProps, rest] = partitionFieldProps(this.props);

    const ElementType = getElementType(Select, this.props);

    return (
      <Field form input as={ElementType} {...fieldProps}>
        <ReactSelect
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
