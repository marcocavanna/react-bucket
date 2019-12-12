import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';

function ScrollableContent(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'scrollable-content',
    className
  );

  const rest = getUnhandledProps(ScrollableContent, props);
  const ElementType = getElementType(ScrollableContent, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

ScrollableContent.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary Content */
  children: PropTypes.node,

  /** User defined classes */
  className: PropTypes.string,

  /** Content shorthand */
  content: PropTypes.node
};

ScrollableContent.create = createShorthandFactory(ScrollableContent, content => ({ content }));

export default ScrollableContent;
