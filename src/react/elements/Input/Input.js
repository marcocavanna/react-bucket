import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

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

  /**
   * Define Component PropTypes
   */
  static propTypes = {
    /** Disabled style */
    disabled: PropTypes.bool,

    /** Set the Field as Required */
    required: PropTypes.bool,

    /** Tab Index for Input Element */
    tabIndex: PropTypes.number,

    /** The input type to use */
    type: PropTypes.string
  }

  /**
   * Set Default Property
   */
  static defaultProps = {
    type: 'text'
  }

  /**
   * Create Input Ref
   */
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

  /**
   * Build an Handle Change for Element
   *
   * @param {React.SyntheticEvent} e
   */
  handleChange = (e) => {
    const value = _.get(e, 'target.value');

    _.invoke(this.props, 'onChange', e, { ...this.props, value });
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
        ref      : this.inputRef
      },
      fieldProps,
      rest
    ];
  }

  /**
   * Render Component Function
   */
  render() {

    const { disabled, required, type } = this.props;

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
        <input {...rest} type={type || 'text'} {...htmlInputProps} />
      </Field>
    );
  }

}

Input.create = createShorthandFactory(Input, type => ({ type }));

export default Input;
