import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps
} from '../../lib';

function MenuHeader(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'header',
    className
  );

  const ElementType = getElementType(MenuHeader, props);
  const rest = getUnhandledProps(MenuHeader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

MenuHeader.propTypes = {
  /** An Element used to Render the Component */
  as: customPropTypes.as,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Content */
  content: PropTypes.any
};

export default MenuHeader;
