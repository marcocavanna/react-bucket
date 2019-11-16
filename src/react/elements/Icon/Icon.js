import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import fontAwesomeClass from '../../../fontawesome/icon-file-generator/get-fontawesom-icon';

import {
  customPropTypes,
  createShorthandFactory,
  getElementType,
  getUnhandledProps,
  classByKey,
  classByPattern
} from '../../lib';

class Icon extends PureComponent {

  /**
   * Set PropTypes
   */
  static propTypes = {
    /** Element used to Render Component */
    as: customPropTypes.as,

    /** Display Icon Border */
    bordered: PropTypes.bool,

    /** User defined Class Name */
    className: PropTypes.string,

    /** Font Color */
    color: PropTypes.string,

    /** Disabled Props */
    disabled: PropTypes.bool,

    /** Fitted Icon has no margin and auto width */
    fitted: PropTypes.bool,

    /** Flip an Icon */
    flip: PropTypes.oneOf(['horizontal', 'vertical', 'both']),

    /** Icon as Link */
    link: PropTypes.bool,

    /** Icon Name */
    name: customPropTypes.fontAwesome,

    /** On Click Handler */
    onClick: PropTypes.func,

    /** Rotate Icon */
    rotate: PropTypes.oneOf([90, 180, 270]),

    /** Icon Size */
    size: customPropTypes.size,

    /** Animate icon using Spin */
    spin: PropTypes.bool,

    /** Icon Style, from FontAwesome Fonts Style */
    style: PropTypes.string
  }

  /**
   * Set Default Props
   */
  static defaultProps = {
    as: 'i'
  }

  /**
   * Set up a function to
   * handle the click event
   *
   * @param {React.SyntheticEvent} e
   */
  handleClick = (e) => {
    const { disabled } = this.props;

    /**
     * If icon is disabled
     * prevent defautl and return
     */
    if (disabled) {
      e.preventDefault();
      return;
    }

    /**
     * Else, fire the Click Event
     */
    _.invoke(this.props, 'onClick', e, this.props);
  }

  render() {
    const {
      className,
      color,
      bordered,
      disabled,
      fitted,
      flip,
      link,
      name,
      rotate,
      size,
      spin,
      style
    } = this.props;

    /**
     * Create icon classes
     */
    const classes = cx(
      'icon',
      fontAwesomeClass(name, style),
      classByPattern(color, 'has-text-%value%'),
      classByPattern(size, 'is-%value%'),
      classByKey(disabled, 'is-disabled'),
      classByKey(bordered, 'is-bordered'),
      classByKey(fitted, 'is-fitted'),
      classByKey(link, 'is-link'),
      classByPattern(rotate, 'fa-rotate-%value%'),
      classByPattern(flip, 'fa-flip-%value%'),
      classByKey(spin, 'fa-spin'),
      className
    );

    const rest = getUnhandledProps(Icon, this.props);
    const ElementType = getElementType(Icon, this.props);

    return <ElementType {...rest} className={classes} onClick={this.handleClick} />;

  }

}

Icon.create = createShorthandFactory(Icon, name => ({ name }));

export default Icon;
