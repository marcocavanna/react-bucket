import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  classByPattern,
  getUnhandledProps,
  getElementType,
  classByKey,
  customPropTypes,
  createShorthandFactory
} from '../../lib';

import HeaderSubheader from './HeaderSubheader';
import HeaderContent from './HeaderContent';

import Icon from '../Icon/Icon';

function Header(props) {

  const {
    children,
    className,
    color,
    content,
    disabled,
    dividing,
    icon,
    image,
    subheader,
    textAlign,
    size
  } = props;

  const classes = cx(
    'header',
    classByPattern(textAlign, 'has-text-%value%'),
    classByPattern(color, 'has-text-%value%'),
    classByKey(icon === true, 'icon'),
    classByKey(image === true, 'image'),
    classByKey(disabled, 'is-disabled'),
    classByKey(dividing, 'is-dividing'),
    classByPattern(size, 'is-%value%'),
    className
  );

  const rest = getUnhandledProps(Header, props);

  const ElementType = getElementType(Header, props);

  /**
   * If some children exists
   * then return the Header element
   * and its children list
   */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  /**
   * Else, build the children
   * using shorthand properties
   */
  const subheaderElement = HeaderSubheader.create(subheader, { autoGenerateKey: false });
  const iconElement = Icon.create(icon, { autoGenerateKey: false });

  return (
    <ElementType {...rest} className={classes}>
      {iconElement}
      <HeaderContent>
        {content}
        {subheaderElement}
      </HeaderContent>
    </ElementType>
  );

}

Header.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary Content */
  children: PropTypes.node,

  /** Additional Classes */
  className: PropTypes.string,

  /** Text Color */
  color: PropTypes.string,

  /** Shorthand Properties for Content */
  content: PropTypes.node,

  /** Disable Header */
  disabled: PropTypes.bool,

  /** Dividing Header */
  dividing: PropTypes.bool,

  /** Add an icon by name or pass Icon object */
  icon: PropTypes.any,

  /** Add an image by src or pass Image object */
  image: PropTypes.any,

  /** Change Header Size */
  size: customPropTypes.size,

  /** Shortheand property for Header.Subheader */
  subheader: PropTypes.any,

  /** Text Align */
  textAlign: customPropTypes.textAlign
};

Header.Content = HeaderContent;
Header.Subheader = HeaderSubheader;

Header.create = createShorthandFactory(Header, (val) => {
  if (_.isString(val)) {
    return { content: val };
  }

  if (_.isObject(val) && !_.isArray(val)) {
    return { content: val.header, subheader: val.subheader, icon: val.icon };
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.log('Header shorthand must be a string or an object with header and/or subheader key');
  }

  return { header: null };
});

export default Header;
