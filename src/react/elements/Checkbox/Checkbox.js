import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  AutoControlledComponent as Component,
  createHTMLLabel,
  getElementType,
  getUnhandledProps,
  htmlInputAttrs,
  partitionHTMLProps,
  classByKey
} from '../../lib';

import Ref from '../../addons/Ref';
import Field from '../Field';

// eslint-disable-next-line react/require-optimization
export default class Checkbox extends Component {

  static propTypes = {
    /** An element used to render the component */
    as: PropTypes.elementType,

    /** Set if is checkd or no */
    checked: PropTypes.bool,

    /** User defined classes */
    className: PropTypes.string,

    /** Initial Checked Value */
    defaultChecked: PropTypes.bool,

    /** Initial Indeterminate state */
    defaultIndeterminate: PropTypes.bool,

    /** Disable a Checkbox */
    disabled: PropTypes.bool,

    /** Element ID */
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /** Indeterminate State */
    indeterminate: PropTypes.bool,

    /** Label Element */
    label: PropTypes.any,

    /** HTML Element Name */
    name: PropTypes.string,

    /**
     * Called when the user attempts to change the checked state.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed checked/indeterminate state.
     */
    onChange: PropTypes.func,

    /**
     * Called when Checkbox has been checked
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed checked/indeterminate state.
     */
    onChecked: PropTypes.func,

    /**
     * Called when the checkbox or label is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and current checked/indeterminate state.
     */

    onClick: PropTypes.func,

    /**
     * Called when the user presses down on the mouse.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and current checked/indeterminate state.
     */
    onMouseDown: PropTypes.func,

    /**
     * Called when the user releases the mouse.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and current checked/indeterminate state.
     */

    onMouseUp: PropTypes.func,

    /**
     * Called when Checkbox has been unchecked
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed checked/indeterminate state.
     */
    onUnchecked: PropTypes.func,

    /** Format a checkbox using radio style */
    radio: PropTypes.bool,

    /** Set the readonly state for a checkbox */
    readOnly: PropTypes.bool,

    /** Format a checkbox using slider style */
    slider: PropTypes.bool,

    /** Set the TabIndex */
    tabIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    /** Format to show a Toggle element */
    toggle: PropTypes.bool,

    /** HTML Input Type */
    type: PropTypes.oneOf(['checkbox', 'radio']),

    /** HTML Input Value */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  static defaultProps = {
    type: 'checkbox'
  }

  static autoControlledProps = ['checked', 'indeterminate']

  inputRef = createRef()

  labelRef = createRef()

  canToggle = () => {
    const { disabled, radio, readOnly } = this.props;
    const { checked } = this.state;

    return !disabled && !readOnly && !(radio && checked);
  }

  getTabIndex = () => {
    const { disabled, tabIndex } = this.props;

    if (!_.isNil(tabIndex)) {
      return tabIndex;
    }

    return disabled ? -1 : 0;
  }

  handleClick = (e) => {
    const { id } = this.props;
    const { checked, indeterminate } = this.state;

    const isInputClicked = _.invoke(this.inputRef.current, 'contains', e.target);
    const isLabelClicked = _.invoke(this.labelRef.current, 'contains', e.target);
    const isRootClick = !isLabelClicked && !isInputClicked;

    const hasId = !_.isNil(id);
    const isLabelClickedAndForwardedToInput = isLabelClicked && hasId;

    if (!isLabelClickedAndForwardedToInput) {
      _.invoke(this.props, 'onClick', e, {
        ...this.props,
        checked       : !checked,
        indeterminate : !!indeterminate
      });
    }

    if (this.isClickFromMouse) {
      this.isClickFromMouse = false;

      if (isLabelClicked && !hasId) {
        this.handleChange(e);
      }

      if (isRootClick) {
        this.handleChange(e);
      }

      if (isLabelClicked && hasId) {
        e.stopPropagation();
      }
    }
  }

  handleChange = (e) => {
    const { checked } = this.state;

    if (!this.canToggle()) {
      return;
    }

    const changeHandlerParams = [e, {
      ...this.props,
      checked       : !checked,
      indeterminate : false
    }];

    _.invoke(this.props, 'onChange', ...changeHandlerParams);

    /** If will be checked, invoke the onChecked function */
    if (!checked) {
      _.invoke(this.props, 'onChecked', ...changeHandlerParams);
    }
    /** Else, invoke the onUnchecked handler */
    else {
      _.invoke(this.props, 'onUnchecked', ...changeHandlerParams);
    }

    this.trySetState({ checked: !checked, indeterminate: false });
  }

  handleMouseDown = (e) => {
    const { checked, indeterminate } = this.state;

    _.invoke(this.props, 'onMouseDown', e, {
      ...this.props,
      checked       : !!checked,
      indeterminate : !!indeterminate
    });

    if (!e.defaultPrevented) {
      _.invoke(this.inputRef.current, 'focus');
    }

    e.preventDefault();
  }

  handleMouseUp = (e) => {
    const { checked, indeterminate } = this.state;

    this.isClickFromMouse = true;

    _.invoke(this.props, 'onMouseUp', e, {
      ...this.props,
      checked       : !checked,
      indeterminate : !!indeterminate
    });
  }

  setIndeterminate = () => {
    const { indeterminate } = this.state;

    _.set(this.inputRef, 'current.indeterminate', !!indeterminate);
  }

  componentDidMount() {
    this.setIndeterminate();
  }

  componentDidUpdate() {
    this.setIndeterminate();
  }

  render() {

    const {
      className,
      disabled,
      label,
      id,
      name,
      radio,
      readOnly,
      slider,
      toggle,
      type,
      value
    } = this.props;

    const { checked, indeterminate } = this.state;

    const classes = cx(
      classByKey(checked, 'is-checked'),
      classByKey(disabled, 'is-disabled'),
      classByKey(indeterminate, 'is-indeterminate'),
      classByKey(radio, 'is-radio'),
      classByKey(readOnly, 'is-readonly'),
      classByKey(slider, 'is-slider'),
      classByKey(toggle, 'is-toggle'),
      classByKey(!slider && !toggle, 'is-simple')
    );

    const unhandled = getUnhandledProps(Checkbox, this.props);
    const ElementType = getElementType(Checkbox, this.props);

    const [htmlInputProps, rest] = partitionHTMLProps(unhandled, { htmlProps: htmlInputAttrs });

    const labelElement = createHTMLLabel(label, {
      defaultProps    : { htmlFor: id },
      autoGenerateKey : false
    }) || <label htmlFor={id} />;

    return (
      <Field
        {...rest}
        form
        checkbox
        className={className}
        as={ElementType}
        bordered={false}
        contentClassName={classes}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <Ref innerRef={this.inputRef}>
          <input
            {...htmlInputProps}
            readOnly
            checked={checked}
            className='is-hidden'
            disabled={disabled}
            id={id}
            name={name}
            tabIndex={this.getTabIndex()}
            type={type}
            value={value}
          />
        </Ref>
        <Ref innerRef={this.labelRef}>{labelElement}</Ref>
      </Field>
    );
  }

}
