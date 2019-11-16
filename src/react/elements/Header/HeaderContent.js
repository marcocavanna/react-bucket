import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  classByPattern,
  customPropTypes,
  getElementType,
  getUnhandledProps
} from '../../lib';

function HeaderContent(props) {
  const {
    children,
    className,
    color,
    content
  } = props;

  const classes = cx(
    'content',
    classByPattern(color, 'has-text-%value%'),
    className
  );

  const rest = getUnhandledProps(HeaderContent, props);

  const ElementType = getElementType(HeaderContent, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

HeaderContent.propTypes = {
  /** An element used to render the component */
  as: customPropTypes.as,

  /** Primary Content */
  children: PropTypes.node,

  /** Additional Classes */
  className: PropTypes.string,

  /** Text Color */
  color: PropTypes.string,

  /** Shorthand Properties for Content */
  content: PropTypes.any
};

export default HeaderContent;
