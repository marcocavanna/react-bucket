import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps
} from '../../lib';

import Icon from '../Icon';

function HeroHeader(props) {

  const {
    children,
    className,
    content,
    icon
  } = props;

  const classes = cx(
    'hero-header',
    className
  );

  const rest = getUnhandledProps(HeroHeader, props);
  const ElementType = getElementType(HeroHeader, props);

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const IconElement = icon && Icon.create(icon);

  return (
    <ElementType {...rest} className={classes}>
      {icon && IconElement}
      {content}
    </ElementType>
  );

}

HeroHeader.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** User Defined classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.any,

  /** Header Shorthand */
  icon: customPropTypes.fontAwesome
};

HeroHeader.create = createShorthandFactory(HeroHeader, content => ({ content }));

export default HeroHeader;
