import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  classByKey,
  classByPattern,
  getElementType,
  getUnhandledProps,
  customPropTypes
} from '../../lib';

import Input from '../../elements/Input';
import FormikCheckbox from './FormikCheckbox';
import FormikInput from './FormikInput';
import FormikSelect from './FormikSelect';

class Form extends React.PureComponent {

  static propTypes = {
    /** The Action */
    action: PropTypes.string,

    /** An element used to render the componenet */
    as: customPropTypes.as,

    /** Childrens */
    children: PropTypes.node,

    /** Additional User defined classes */
    className: PropTypes.string,

    /** Automatically show error message */
    error: PropTypes.bool,

    /** Automatically show loading */
    loading: PropTypes.bool,

    /** Change form size */
    size: customPropTypes.size,

    /** Automatically show Success */
    success: PropTypes.bool,

    /** Automatically show warning */
    warning: PropTypes.bool
  }

  static defaultProps = {
    as: 'form'
  }

  static Input = Input

  static FormikCheckbox = FormikCheckbox

  static FormikInput = FormikInput

  static FormikSelect = FormikSelect

  handleFormSubmit = (e, ...args) => {
    /** Get Action from Props */
    const { action } = this.props;

    /** If no action, prevent default */
    if (typeof action !== 'string') {
      _.invoke(e, 'preventDefault');
    }

    /** Invoce the onSubmit Function if Exists */
    _.invoke(this.props, 'onSubmit', e, this.props, ...args);
  }

  render() {
    const {
      action,
      children,
      className,
      error,
      loading,
      size,
      success,
      warning
    } = this.props;

    const classes = cx(
      'form',
      classByKey(error, 'is-error'),
      classByKey(loading, 'is-loading'),
      classByPattern(size, 'is-%value%'),
      classByKey(success, 'is-success'),
      classByKey(warning, 'is-warning'),
      className
    );

    const rest = getUnhandledProps(Form, this.props);
    const ElementType = getElementType(Form, this.props);

    return (
      <ElementType {...rest} action={action} className={classes} onSubmit={this.handleFormSubmit}>
        {children}
      </ElementType>
    );
  }

}

export default Form;
