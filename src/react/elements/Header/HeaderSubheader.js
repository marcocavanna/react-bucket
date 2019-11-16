import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  classByPattern,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps
} from '../../lib';

function HeaderSubheader(props) {
  const {
    children,
    className,
    color,
    content
  } = props;

  const classes = cx(
    'subheader',
    classByPattern(color, 'has-text-%value%'),
    className
  );

  const rest = getUnhandledProps(HeaderSubheader, props);

  const ElementType = getElementType(HeaderSubheader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

HeaderSubheader.propTypes = {
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

HeaderSubheader.create = createShorthandFactory(HeaderSubheader, content => ({ content }));

export default HeaderSubheader;
