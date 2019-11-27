import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  getUnhandledProps,
  getElementType
} from '../../lib';

function PopupContent(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'content',
    className
  );

  const rest = getUnhandledProps(PopupContent, props);
  const ElementType = getElementType(PopupContent, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

PopupContent.propTypes = {
  /** An Element used to render the component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional User Classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node
};

PopupContent.create = createShorthandFactory(PopupContent, content => ({ content }));

export default PopupContent;
