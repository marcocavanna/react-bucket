import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  customPropTypes,
  childrenUtils,
  createShorthandFactory,
  getUnhandledProps,
  getElementType
} from '../../lib';

function PopupHeader(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'header',
    className
  );

  const rest = getUnhandledProps(PopupHeader, props);
  const ElementType = getElementType(PopupHeader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

PopupHeader.propTypes = {
  /** An Element used to render the component */
  as: customPropTypes.as,

  /** Additional User Classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.any
};

PopupHeader.create = createShorthandFactory(PopupHeader, content => ({ content }));

export default PopupHeader;
