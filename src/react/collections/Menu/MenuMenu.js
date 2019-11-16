import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  classByKey,
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps
} from '../../lib';

function MenuMenu(props) {

  const {
    children,
    className,
    content,
    right
  } = props;

  const classes = cx(
    'sub-menu',
    classByKey(right, 'on-right'),
    className
  );

  const ElementType = getElementType(MenuMenu, props);
  const rest = getUnhandledProps(MenuMenu, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

MenuMenu.propTypes = {
  /** An Element used to render the component */
  as: customPropTypes.as,

  /** User defined Classes */
  className: PropTypes.string,

  /** Shorthand for Content */
  content: PropTypes.any,

  /** Position on Right */
  right: PropTypes.bool
};

export default MenuMenu;
