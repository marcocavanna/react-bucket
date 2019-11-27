import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';

function ModalHeader(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'modal-header',
    className
  );

  const rest = getUnhandledProps(ModalHeader, props);
  const ElementType = getElementType(ModalHeader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

ModalHeader.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes */
  className: PropTypes.string,

  /** Primary Header Content */
  content: PropTypes.node
};

ModalHeader.create = createShorthandFactory(ModalHeader, content => ({ content }));

export default ModalHeader;
