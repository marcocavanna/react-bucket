import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import Icon from '../Icon';

import {
  classByKey,
  classByPattern,
  customPropTypes,
  getElementType,
  getUnhandledProps
} from '../../lib';

function HeroButton(props) {

  const {
    className,
    content,
    disabled,
    discreet,
    header,
    icon,
    variation
  } = props;

  const classes = cx(
    'hero-button',
    classByKey(disabled, 'is-disabled'),
    classByKey(discreet, 'is-discreet'),
    classByPattern(variation, 'hero-variation-%value%'),
    className
  );

  const rest = getUnhandledProps(HeroButton, props);
  const ElementType = getElementType(HeroButton, props);

  const IconElement = icon && Icon.create(icon);

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    _.invoke(props, 'onClick', e, props);
  };

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {header && <div className='hero-button-header'>{header}</div>}
      {content && <div className='hero-button-content'>{content}</div>}
      {icon && <div className='hero-button-icon'>{IconElement}</div>}
    </ElementType>
  );

}

HeroButton.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** User defined classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.any,

  /** Disable Button */
  disabled: PropTypes.bool,

  /** Discreet Property */
  discreet: PropTypes.bool,

  /** Header shorthand */
  header: PropTypes.any,

  /** Icon Shorthand */
  icon: customPropTypes.fontAwesome,

  /** Color Variation */
  variation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default HeroButton;
