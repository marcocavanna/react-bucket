import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';

function ModalContent(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    className,
    'modal-content'
  );

  const rest = getUnhandledProps(ModalContent, props);
  const ElementType = getElementType(ModalContent, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

ModalContent.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Additional user defined classes */
  className: PropTypes.string,

  /** Shorthand for primary content */
  content: PropTypes.node
};

ModalContent.create = createShorthandFactory(ModalContent, content => ({ content }));

export default ModalContent;
